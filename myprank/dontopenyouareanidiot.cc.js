// dontopenyouareanidiot.cc.js - Версия с имитацией ошибок Windows
const currentUrl = window.location.hostname;

if (currentUrl.includes("youareanidiot.org") || currentUrl.includes("youareanidiot.cc")) {
  
  document.body.innerHTML = "";

  const totalSpawn = 5; 
  let spawnedWindows = [];

  function createIdiotWindow() {
    let win = window.open("", "_blank", "width=400,height=180,left=" + Math.random()*800 + ",top=" + Math.random()*600);
    
    if (win) {
      // Рандомно выбираем: это будет мигающий текст или окно ошибки Windows
      const isWindowsError = Math.random() > 0.5;

      if (isWindowsError) {
        // ШАБЛОН ОКНА ОШИБКИ WINDOWS (Стиль старой доброй Windows XP/7)
        win.document.write(`
          <html>
          <head><title>Системная ошибка</title></head>
          <body style="background-color: #f0f0f0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; user-select: none; overflow: hidden;">
            
            <!-- Заголовок окна -->
            <div style="background: linear-gradient(to right, #0054e3, #267bef); color: white; padding: 6px 10px; font-size: 10pt; font-weight: bold; display: flex; justify-content: space-between; align-items: center;">
              <span>Error.exe - Системная ошибка</span>
              <span style="background: #e81123; color: white; padding: 2px 8px; font-size: 9pt; border: 1px solid #7a0000; cursor: pointer;">X</span>
            </div>

            <!-- Контент ошибки -->
            <div style="display: flex; align-items: center; padding: 20px 15px;">
              <!-- Иконка красного креста ошибки -->
              <div style="background-color: #e81123; color: white; width: 35px; height: 35px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 20pt; font-weight: bold; font-family: sans-serif; margin-right: 15px; box-shadow: 1px 1px 3px rgba(0,0,0,0.3);">
                ✕
              </div>
              <!-- Текст -->
              <div style="font-size: 10pt; color: #000; line-height: 1.4;">
                <b>Инструкция по адресу "0x00000000" обратилась к памяти.</b><br>
                Ошибка системы: Пользователь является идиотом (IDIOT_DETECTED).
              </div>
            </div>

            <!-- Кнопка ОК -->
            <div style="background-color: #f0f0f0; text-align: center; padding-bottom: 15px;">
              <button onclick="window.close()" style="padding: 5px 25px; font-size: 10pt; background-color: #e1e1e1; border: 1px solid #adadad; box-shadow: inset 0 0 1px #fff; cursor: pointer;">ОК</button>
            </div>

          </body>
          </html>
        `);
      } else {
        // КЛАССИЧЕСКИЙ МИГАЮЩИЙ HTML С ТРЯСКОЙ
        win.document.write(`
          <html>
          <head><title>YOU ARE AN IDIOT!</title></head>
          <body style="background-color:black; color:white; text-align:center; font-family:'Courier New',monospace; overflow:hidden; user-select:none; margin:0;">
            <div id="marquee-box" style="position:absolute; width:100%; top:35%;">
              <h2 id="text" style="font-size:24pt; font-weight:bold; margin:0; transition: all 0.05s ease;">YOU ARE AN IDIOT!</h2>
            </div>
            <script>
              const textEl = document.getElementById("text");
              setInterval(() => {
                document.body.style.backgroundColor = document.body.style.backgroundColor === "black" ? "white" : "black";
                textEl.style.color = textEl.style.color === "white" ? "black" : "white";
              }, 200);
              setInterval(() => {
                textEl.style.transform = "translate(" + (Math.random()*20-10) + "px, " + (Math.random()*20-10) + "px)";
              }, 60);
            </script>
          </body>
          </html>
        `);
      }

      // Сами окна продолжают бешено прыгать по экрану, независимо от их дизайна
      setInterval(() => {
        win.moveBy(Math.random() * 60 - 30, Math.random() * 60 - 30);
      }, 40);

      // При попытке закрыть (на кнопку ОК, на крестик ошибки или на крестик браузера) — спавним 4 новых окна!
      win.onbeforeunload = function() {
        setTimeout(() => {
          for (let i = 0; i < 4; i++) {
            createIdiotWindow();
          }
        }, 50);
      };

      spawnedWindows.push(win);
    }
  }

  // Главный экран-активатор
  const bg = document.createElement("div");
  bg.style = "position:fixed;top:0;left:0;width:100vw;height:100vh;background:#fff;z-index:999999;text-align:center;padding-top:100px;user-select:none;";
  bg.innerHTML = "<h1 id='main-title' style='font-size:60pt;font-weight:bold;'>YOU ARE AN IDIOT!</h1>";
  document.body.appendChild(bg);

  setInterval(() => {
    bg.style.background = bg.style.background === "rgb(255, 255, 255)" ? "#000" : "#fff";
    const title = document.getElementById("main-title");
    title.style.color = title.style.color === "black" ? "#fff" : "#000";
  }, 200);

  for (let i = 0; i < totalSpawn; i++) {
    createIdiotWindow();
  }

  window.onbeforeunload = function() {
    for (let i = 0; i < 4; i++) {
      createIdiotWindow();
    }
    return "Заблокировано!";
  };
}