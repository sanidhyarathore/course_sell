const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");

router.post('/signup', async (req, res) => {
    const username=req.body.username;
    const password=req.body.password;
    User.create({
        username,
        password
    })
    res.json({
        message: "User created successfully"
    })
});

router.get('/courses', (req, res) => {
    const response = Course.find({});
    res.json({
        courses:response
    })
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    const courseId=req.params.courseId;
    const username=req.headers.username;
    
    await User.updateOne({
        username: username
    },{
        "$push": {
            purchasedCourses :courseId
        }
    })   
    
    res.json({
        message:"Purchase Complete"
    })
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    const username=req.headers.username;
    const user= await User.findOne({
        username
    });
    const courses= await Course.find({
        _id:{
            "$in": user.purchasedCourses
        }
    });
    res.json({
        courses: courses
    })

});

module.exports = router