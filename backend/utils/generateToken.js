import jwt from 'jsonwebtoken';

const generateTokenAndSetCookie = (userId, res) => {
    try{
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });

    res.cookie('jwt', token,{
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV !== 'development'    
})} catch(error){
    console.log("Error generating token", error);
}
};

export default generateTokenAndSetCookie;
