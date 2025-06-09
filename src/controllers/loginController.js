const authService = require("../services/loginService");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await authService.login(email, password);
    res.json({ token: token });
  } catch (error) {
    res.status(401).json({ message: "Invalid Credentials" });
  }
}
exports.refreshToken = async (req, res) =>{
  try {
    const { token } = req.body;
    const newToken = await authService.refreshToken(token);
    res.json({ newToken: newToken });
  } catch (error) {
    
    res.status(401).json({ message: "Invalid Token" });
  }
}

