const express = require("express"); // express 가져오기
const router = express.Router(); // 위와 같음 (규칙)

function testMiddleware() {
  console.log("첫번째 미들웨어");
  next();
}

function testMiddleware2(req, res, next) {
  console.log("두번째 미들웨어");
  next();
}

/* 실제 사용 예시
function loginRequired(req, res, next) {
  if (로그인이 되어있지 않으면) {
    res.redirect(로그인창으로)
  } else {
    next();
  }
} router.get에 인자로 함수이름(loginRequired) 넣으면 댐
*/

router.get("/", (req, res) => {
  res.send("admin 이후 url");
});

router.get("/products", (req, res) => {
  // res.send("admin products"); // 응답 부분 (텍스트 입력)
  res.render("admin/products.html", {
    message: "<h1>결여된 박솔휘</h1>",
    online: "express",
    // 둘중 하나만 가능함 why?
  });
});

router.get("/products/write", (req, res) => {
  res.render("admin/write.html");
});

router.post("/products/write", (req, res) => {
  res.send(req.body);
});

module.exports = router;
