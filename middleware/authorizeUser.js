export const authorizeUser =(role)=> (req, res, next ) => {
    try {
      let checkAuthorize = false;
      for (let i = 0; i < role.length; i++) {
        if (req.user.role === role[i]) {
          checkAuthorize = true;
          break;
        }
      }
      if (checkAuthorize) return next();
  
      return res.status(401).json({ message: "Invalid access" });
    } catch (error) {
      res.status(500).json(error);
    }
  };