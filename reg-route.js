module.exports = function RegRoutes(reg, regFunction){

    // module.exports = function regFunction()

    async function addRegNum(req, res){
       
    let result =   await reg.addReg(req.body.setReg)
       
        let regex =  /[A-Z]{1,3}\s{1}\d{3}(|\s|\S|-)\d{3}/; 
        let regNo = req.body.setReg

        if(result.length > 0){
            req.flash('info', "You have already added the registration number" )
        }
         if (regNo == "" )  {
           await sendErrorMsg(req.body.setReg)
            req.flash('info',await errorMsg()) 
            
         } 
        else if (!regex.test(regNo))  {
             await sendErrorMsg(req.body.setReg)
            req.flash('info', await errorMsg()) 
         } 
        

        res.redirect('/')
    }

    async function deleteAll(req, res){
        await reg.deleteReg()
        req.flash('success', 'You have deleted all registration numbers')

        res.redirect('/')
    }
    
    async function showReg(req, res){
        res.render('index',{
            
            reg_number: await reg.displayReg()
            // error: await reg.errorMsg()

        })
       
    }

    async function filterReg(req, res){
        getFilter = await reg.filterReg()
        reg_number = await reg.filterReg(
            req.body.town)
        if(reg_number == 0){
            req.flash('error', "No registration numbers for the selected town")
        }
        
        res.render('index',{
            reg_number: await reg.filterReg(
                req.body.town)
               
                
            })
    }

    async function duplicateReg(){
        
    }

    let errMsg;
    async function sendErrorMsg(regNum){
        let regex =  /[A-Z]{1,3}\s{1}\d{3}(|\s|\S|-)\d{3}/;
    
         if(regex.test(regNum) == false){
            errMsg = "Please enter the correct format of registration number"
        }
        if(regNum == ''){
            errMsg = "Please add registration number"
        }
       
    }

    async function errorMsg(){
        return errMsg;
    }


    
    return{
        addRegNum,
        showReg,
        deleteAll,
        filterReg,
        sendErrorMsg,
        duplicateReg,
        errorMsg
    }
}