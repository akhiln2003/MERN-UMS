const notFound = ( req , res , next )=>{
    const error = new Error( `Not found - ${req.originalUrl}`);
    res.status(404);
    next(error);
}
 
const errorHandiler = ( error , req , res , next ) => {
    let statusCode =  res.statusCode === 200 ? 500 : res.statusCode;
    let message = error.message ;

    if( error.name === 'CastError' && error.kind === 'ObjectId'){
        statusCode = 404;
        message = 'Resource not found'
    }
    res.status( statusCode ).json({
        message , 
        stack : process.env.NODE_ENV === 'Production' ? null : error.stack
    });
}
 

export {
    notFound,
    errorHandiler
}