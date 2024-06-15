const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err))
    }
}


export { asyncHandler }
 

// hmne asynchandler toh bnaya hai , accept kiya hai ekk method (requestHandler) , yeh method vapis return bhi krna hoga , as a function usse accept kru as a function hi usse return kr du


// const asyncHandler = (fn) => async (req,res,next) {
//     try{
//         await fn(req,res,next)
//     } catch (error) {
//         res.status(err.code || 500).json({
//             success: false,
//             message: err.message
//         })
//     }
// }