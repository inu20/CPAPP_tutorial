/**
* Implementation for CatalogService defined in ./cat-service.cds
*/
const cds = require('@sap/cds')
module.exports = cds.service.impl(async function (srv){
  const db = await cds.connect.to('db');
  const { Users, Students } = db.entities;

  // Register your event handlers in here, e.g....
  srv.after ('READ', 'Users', each => {
    each.Email = each.Email.replace('@intake.education', '@idp.com');
    each.sap_icon = '';
    if(!each.Enabled ){
      each.sap_icon = 'sap-icon://edit';
    }
  })

  // ....
  srv.on('CREATE_NewUser', async(req)=>{
      
      const addUser = await INSERT.into(Users).entries(req.data);

      let newID = addUser.results[0].lastInsertRowid
      const newUser = await db.read(Users).where({ ID: newID });
      return {ID: newID, user: newUser[0]};
  });

  srv.on('DELETE_User', async(req)=>{
      let user_id = req.data.ID;
      
      const User = await db.read(Users).where({ ID: user_id });
      if( User.length >0 ){
        const res = await db.delete(Users).where({ ID: user_id });

        return { res:res, ID: user_id, user: User,
                  error:{
                    code: 0, target: '', message: ''
                  }
                };
      }

      return { res: 0,
                error:{
                  code: -1, target: 'DELETE_User', message: 'User not found'
                }
              }
  });

  srv.on('UPDATE_Student_CRM_Status', async(req)=>{
    let update_id = req.data.ID,
        CRM_Status = req.data.Status;
    let oPostData ={
          ID    : req.data.ID,
          Status: req.data.Status,
        }
    
    console.log( oPostData );
    const Target = await db.read(Students).where({ ID: update_id });
    if( Target.length >0 ){
      
      const res = await db.update(Students).set({CRM_Status: CRM_Status}).where({ ID: update_id })
      return { res:res, ID: update_id, target: Target,
              error:{
                code: 0, target: 'Target', message: ''
              }
            }
    }
  
    return { res: 0,
            error:{
              code: -1, target: 'Target', message: 'Target not found'
            }
          }
  });

})

