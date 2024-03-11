document.onreadystatechange = function () {
  if (document.readyState !== "complete") {
    document.querySelector("body").style.visibility = "hidden";
    document.querySelector("#preloader").style.visibility = "visible";
  } else {
    document.querySelector("#preloader").style.display = "none";
    document.querySelector("body").style.visibility = "visible";
    showGreetings();
  }
};

const disabledKeys = ["u", "I", "s"];

document.addEventListener("keydown", function (event) {
  if (
    (event.ctrlKey && disabledKeys.includes(event.key)) ||
    event.key === "F12"
  ) {
    event.preventDefault();
    createToast("warning", "Sorry, you can't perform this action!");
  }
});

document.addEventListener("contextmenu", function (event) {
  event.preventDefault();
  createToast("warning", "Sorry, you can't perform this action!");
});

window.addEventListener("online", (e) => {
  createToast("success", "Hurray! Internet is connected.");
});

window.addEventListener("offline", (e) => {
  createToast("error", "Opps! Internet is disconnected.");
});

function showGreetings() {
  let hourValue = new Date().getHours();
  if (hourValue >= 0 && hourValue <= 5) {
    createToast("info", "Wishing you a peaceful new day!");
  } else if (hourValue >= 6 && hourValue <= 10) {
    createToast(
      "info",
      "Good morning! Hope you have a successful and happy day!"
    );
  } else if (hourValue >= 11 && hourValue <= 12) {
    createToast("info", "Noon! Hope you have a delicious lunch!");
  } else if (hourValue >= 13 && hourValue <= 18) {
    createToast(
      "info",
      "Good afternoon! Try to complete your work for the day!"
    );
  } else if (hourValue >= 19 && hourValue <= 21) {
    createToast(
      "info",
      "Good evening! Hope you have a fun and happy dinner with your loved ones!"
    );
  } else if (hourValue >= 22 && hourValue <= 24) {
    createToast(
      "info",
      "It's late! Let's go to sleep! Wishing you a good night's sleep and beautiful dreams!"
    );
  }
}

const notifications = document.querySelector(".notifications");
const toastDetails = {
  timer: 5000,
  success: {
    icon: "fa-circle-check",
    text: "Success!",
  },
  error: {
    icon: "fa-circle-xmark",
    text: "Error!",
  },
  warning: {
    icon: "fa-circle-exclamation",
    text: "Warning!",
  },
  info: {
    icon: "fa-circle-info",
    text: "Info!",
  },
};

const removeToast = (toast) => {
  toast.classList.add("hide");
  if (toast.timeoutId) clearTimeout(toast.timeoutId);
  setTimeout(() => toast.remove(), 500);
};

const createToast = (id, text_msg) => {
  const { icon, text } = toastDetails[id];
  const toast = document.createElement("li");
  toast.className = `toast ${id}`;
  toast.innerHTML = `<div class="column">
                        <i class="fa-solid ${icon}"></i>
                        <div class="text-msg"><h4>${text}</h4><span>${text_msg}</span></div>
                    </div>
                    <i class="fa-solid fa-xmark" onclick="removeToast(this.parentElement)"></i>`;
  notifications.appendChild(toast);
  toast.timeoutId = setTimeout(() => removeToast(toast), toastDetails.timer);
};

const songs = [
  {
    name: "Tan Ca - Dat Ozy, PiaLinh",
    image: "./images/audio/TanCa-DatOzyPiaLinh.jpg",
    audio: "./audio/TanCa-DatOzyPiaLinh.mp3",
  },
  {
    name: "Buc Tranh Tu Nuoc Mat - Mr.Siro",
    image: "./images/audio/BucTranhTuNuocMat-MrSiro.jpg",
    audio: "./audio/BucTranhTuNuocMat-MrSiro.mp3",
  },
  {
    name: "Hon Ca Yeu - Duc Phuc",
    image: "./images/audio/HonCaYeu-DucPhuc.jpg",
    audio: "./audio/HonCaYeu-DucPhuc.mp3",
  },
  {
    name: "Co Em La Dieu Tuyet Voi Nhat - Thien Tu",
    image: "./images/audio/CoEmLaDieuTuyetVoiNhat-ThienTu.jpg",
    audio: "./audio/CoEmLaDieuTuyetVoiNhat-ThienTu.mp3",
  },
  {
    name: "Say Trong Nu Cuoi - Tang Duy Tan",
    image: "./images/audio/SayTrongNuCuoi-TangDuyTan.jpg",
    audio: "./audio/SayTrongNuCuoi-TangDuyTan.mp3",
  },
  {
    name: "Duoi Nhung Con Mua - Mr.Siro",
    image: "./images/audio/DuoiNhungConMua-MrSiro.jpg",
    audio: "./audio/DuoiNhungConMua-MrSiro.mp3",
  },
];

let audio = document.querySelector("#audio");
let playAudio = document.querySelector("#play-audio");
let pauseAudio = document.querySelector("#pause-audio");
let imageAudio = document.querySelector("#image-audio");
let nameAudio = document.querySelector("#name-audio");

let songIndex = Math.floor(Math.random() * songs.length);

const loadSong = () => {
  audio.src = songs[songIndex].audio;
  imageAudio.style.backgroundImage = "url('" + songs[songIndex].image + "')";
  nameAudio.innerHTML = songs[songIndex].name;
};

playAudio.addEventListener("click", () => {
  audio.play();
  playAudio.style.display = "none";
  pauseAudio.style.display = "block";
});

pauseAudio.addEventListener("click", () => {
  audio.pause();
  pauseAudio.style.display = "none";
  playAudio.style.display = "block";
});

audio.addEventListener(
  "ended",
  function () {
    songIndex = (songIndex + 1) % songs.length;
    loadSong();
    audio.play();
  },
  true
);

document
  .querySelector("#btn-share-page")
  .addEventListener("click", function () {
    if (navigator.share) {
      navigator
        .share({
          title: "📢 Welcome to the information page of CNX 🎉",
          url: "https://chiennguyen-i.github.io/profile/",
        })
        .then(() => {
          setTimeout(() => {
            createToast("info", "Thanks for sharing!");
          }, 5000);
        })
        .catch((err) => {
          createToast("error", "Error!");
        });
    } else {
      createToast("warning", "Browser doesn't support!");
    }
  });

document
  .querySelector("#btn-download-vcf")
  .addEventListener("click", function () {
    window.open("./vcf/vCard.vcf", "_blank");
  });

var modalOverlay = document.querySelector("#modal-overlay");
var modalBank = document.querySelector("#modalBank");
var closeModalBank = document.querySelector("#close-modal-bank");
var openModalBank = document.querySelector("#open-modal-bank");
var modalMessage = document.querySelector("#modalMessage");
var closeModalMessage = document.querySelector("#close-modal-message");
var openModalMessage = document.querySelector("#open-modal-message");
var modalWeather = document.querySelector("#modalWeather");
var closeModalWeather = document.querySelector("#close-modal-weather");
var openModalWeather = document.querySelector("#open-modal-weather");

openModalBank.addEventListener("click", function () {
  modalBank.classList.toggle("closed");
  modalOverlay.classList.toggle("closed");
});

closeModalBank.addEventListener("click", function () {
  modalBank.classList.toggle("closed");
  modalOverlay.classList.toggle("closed");
});

openModalMessage.addEventListener("click", function () {
  modalMessage.classList.toggle("closed");
  modalOverlay.classList.toggle("closed");
});

closeModalMessage.addEventListener("click", function () {
  modalMessage.classList.toggle("closed");
  modalOverlay.classList.toggle("closed");
});

openModalWeather.addEventListener("click", function () {
  modalWeather.classList.toggle("closed");
  modalOverlay.classList.toggle("closed");
});

closeModalWeather.addEventListener("click", function () {
  modalWeather.classList.toggle("closed");
  modalOverlay.classList.toggle("closed");
});

document
  .querySelector("#btn-download-qr-bank")
  .addEventListener("click", function () {
    var url = "./images/qr/qr_mb_bank_195.png";
    fetch(url, {
      mode: "no-cors",
    })
      .then((response) => response.blob())
      .then((blob) => {
        let blobUrl = window.URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.download = url.replace(/^.*[\\\/]/, "");
        a.href = blobUrl;
        document.body.appendChild(a);
        a.click();
        a.remove();
      });
  });

document
  .querySelector("#btn-copy-number-bank")
  .addEventListener("click", function () {
    navigator.clipboard.writeText("0948098195");
    createToast("success", "Copy success ✔");
  });

var networkJson;
const getIPAddress = async () => {
  const request = await fetch(
    "https://ipinfo.io/json?token=5e2073aeb7c1d9"
  ).then((response) => response.json());
  networkJson = {
    ip: request.ip,
    details:
      "ip: " +
      request.ip +
      "; hostname: " +
      request.hostname +
      "; city: " +
      request.city +
      "; country: " +
      request.country,
  };
};

var api_key_check_mail = "ema_live_TCct64br5FRDIiVpvQQ3Ih7tWqfcUI0J2qDEpKSV";
var secureTokenMail = "DC3E553B-CC71-4D8D-9F99-875C31204BE1";
var nameInput = document.querySelector("#name-input");
var phoneInput = document.querySelector("#phone-input");
var emailInput = document.querySelector("#email-input");
var subjectInput = document.querySelector("#subject-input");
var msgInput = document.querySelector("#msg-input");
var nameError = document.querySelector("#name-error");
var phoneError = document.querySelector("#phone-error");
var emailError = document.querySelector("#email-error");
var emailCheck = document.querySelector("#email-check");
var subjectError = document.querySelector("#subject-error");
var msgError = document.querySelector("#msg-error");
var isExistingEmail;

async function checkExistingEmail() {
  emailCheck.innerHTML = "Checking...";
  emailError.innerHTML = "";
  emailInput.style.border = "1px solid #e9bd0c";
  let res = await fetch(
    `https://api.emailvalidation.io/v1/info?apikey=${api_key_check_mail}&email=${emailInput.value}`
  );
  let result = await res.json();
  if (result.smtp_check && result.mx_found && result.state === "deliverable") {
    emailCheck.innerHTML = "";
    emailError.innerHTML = "";
    emailInput.style.border = "1px solid #008000";
    isExistingEmail = true;
  } else {
    emailCheck.innerHTML = "";
    emailError.innerHTML = "Please enter an existing email address";
    emailInput.style.border = "1px solid #ff0000";
    isExistingEmail = false;
  }
}

function validateName() {
  if (nameInput.value.length == 0) {
    nameError.innerHTML = "Please enter your name";
    nameInput.style.border = "1px solid #ff0000";
    return false;
  }
  if (
    !nameInput.value.match(
      /^([a-zA-ZàáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹýÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ]+)((\s{1}[a-zA-ZàáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹýÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ]+){1,})$/
    )
  ) {
    nameError.innerHTML = "Please enter a valid name";
    nameInput.style.border = "1px solid #ff0000";
    return false;
  }
  nameError.innerHTML = "";
  nameInput.style.border = "1px solid #008000";
  return true;
}

function validatePhone() {
  if (phoneInput.value.length == 0) {
    phoneError.innerHTML = "Please enter your phone number";
    phoneInput.style.border = "1px solid #ff0000";
    return false;
  }
  if (
    !phoneInput.value.match(
      /^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/
    )
  ) {
    phoneError.innerHTML = "Please enter a valid phone number";
    phoneInput.style.border = "1px solid #ff0000";
    return false;
  }
  phoneError.innerHTML = "";
  phoneInput.style.border = "1px solid #008000";
  return true;
}

function validateEmail() {
  if (emailInput.value.length == 0) {
    emailCheck.innerHTML = "";
    emailError.innerHTML = "Please enter your email address";
    emailInput.style.border = "1px solid #ff0000";
    isExistingEmail = false;
    return false;
  }
  if (
    !emailInput.value.match(
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i
    )
  ) {
    emailCheck.innerHTML = "";
    emailError.innerHTML = "Please enter a valid email address";
    emailInput.style.border = "1px solid #ff0000";
    isExistingEmail = false;
    return false;
  }
  emailCheck.innerHTML = "";
  emailError.innerHTML = "";
  emailInput.style.border = "1px solid #008000";
  isExistingEmail = false;
  return true;
}

function validateSubject() {
  var required = 10;
  var left = required - subjectInput.value.length;
  if (left > 0) {
    subjectError.innerHTML =
      "Please enter an additional " + left + " characters";
    subjectInput.style.border = "1px solid #ff0000";
    return false;
  }
  subjectError.innerHTML = "";
  subjectInput.style.border = "1px solid #008000";
  return true;
}

function validateMsg() {
  var required = 20;
  var left = required - msgInput.value.length;
  if (left > 0) {
    msgError.innerHTML = "Please enter an additional " + left + " characters";
    msgInput.style.border = "1px solid #ff0000";
    return false;
  }
  msgError.innerHTML = "";
  msgInput.style.border = "1px solid #008000";
  return true;
}

document.querySelector("#frmMsg").addEventListener("submit", function (event) {
  event.preventDefault();
  if (
    !validateName() ||
    !validatePhone() ||
    !validateEmail() ||
    !validateSubject() ||
    !validateMsg()
  ) {
    createToast("warning", "Please enter complete information.");
    return false;
  } else {
    createToast(
      "warning",
      "Checking the email address. Please wait for the inspection. Thanks!"
    );
    checkExistingEmail();
    setTimeout(() => {
      if (!isExistingEmail) {
        createToast("warning", "Please enter complete information.");
        return false;
      } else {
        Email.send({
          SecureToken: secureTokenMail,
          To: emailInput.value,
          From: "bot.nguyen.v02@gmail.com",
          Subject: "Thanks for getting in touch!",
          Body:
            `<body marginheight="0" topmargin="0" marginwidth="0" style="margin:0px;background-color:#f2f3f8;" leftmargin="0">
              <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8" style="font-family:'Open Sans', sans-serif;">
                <tr>
                  <td>
                    <table style="background-color:#f2f3f8;max-width:670px;margin:0 auto;" width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="height:80px;">&nbsp;</td>
                      </tr>
                      <tr>
                        <td style="text-align:center;">
                          <a href="https://chiennguyen-i.github.io/profile/" title="logo" target="_blank">
                            <img width="60" src="https://raw.githubusercontent.com/ChienNguyen-i/profile/main/images/logo/logo.png" title="Logo" alt="logo">
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td style="height:20px;">&nbsp;</td>
                      </tr>
                      <tr>
                        <td>
                          <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" style="max-width:670px;background:#fff;border-radius:3px;text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                            <tr>
                              <td style="height:40px;">&nbsp;</td>
                            </tr>
                            <tr>
                              <td>
                                <img src="https://raw.githubusercontent.com/ChienNguyen-i/profile/main/images/others/thank-you-image.png" alt="thank-you" width="60%">
                              </td>
                            </tr>
                            <tr>
                              <td style="height:50px;">&nbsp;</td>
                            </tr>
                            <tr>
                              <td style="padding:0 35px;">
                                <h1 style="color:#1e1e2d;font-weight:500;margin:0;font-size:32px;">Thanks for getting in touch</h1>
                                <p style="font-size:15px;color:#455056;margin:8px 0 0;line-height:24px;">This is an automated email to confirm your message has been sent. Your note was really thoughtful. I sincerely appreciate you taking the time to send it. I will respond to you as soon as possible. Have a good day!</p>
                                <span style="display:inline-block;vertical-align:middle;margin:29px 0 26px;border-bottom:1px solid #cecece;width:100px;"></span>
                                <p style="display:block;font-size:13px;margin:0 0 4px;color:rgba(0,0,0,.64);font-weight:normal;">If you do not take this action, you can safely ignore this email.</p>
                                <a href="https://chiennguyen-i.github.io/profile/" target="_blank" style="background:#20e277;text-decoration:none !important;display:inline-block;font-weight:500;margin-top:24px;color:#fff;font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">GO TO PAGE</a>
                              </td>
                            </tr>
                            <tr>
                              <td style="height:40px;">&nbsp;</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="height:20px;">&nbsp;</td>
                      </tr>
                      <tr>
                        <td style="text-align:center;">
                          <p style="font-size:12px;color:rgba(69, 80, 86, 0.7411764705882353);line-height:18px;margin:0 0 0;">&copy; ` +
            new Date().getFullYear() +
            `
                          , made with ❤️ by <a href="https://chiennguyen-i.github.io/profile/" target="_blank" style="text-decoration:none;color:#0000ff;">CNX</a></p>
                        </td>
                      </tr>
                      <tr>
                        <td style="height:80px;">&nbsp;</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
          </body>`,
        }).then((message) =>
          message === "OK"
            ? createToast(
                "success",
                "Hurray! Sent successfully. Have a good day!"
              )
            : createToast("error", "Opps! Sent failed. Please try again later.")
        );
        Email.send({
          SecureToken: secureTokenMail,
          To: "nguyenchien200142@gmail.com",
          From: "bot.nguyen.v02@gmail.com",
          Subject: "Messenger from " + nameInput.value,
          Body:
            `<body marginheight="0" topmargin="0" marginwidth="0" style="margin:0px;background-color:#f2f3f8;" leftmargin="0">
              <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8" style="font-family:'Open Sans', sans-serif;">
                <tr>
                  <td>
                    <table style="background-color:#f2f3f8;max-width:670px;margin:0 auto;" width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="height:80px;">&nbsp;</td>
                      </tr>
                      <tr>
                        <td style="text-align:center;">
                          <a href="https://chiennguyen-i.github.io/profile/" title="logo" target="_blank">
                            <img width="60" src="https://raw.githubusercontent.com/ChienNguyen-i/profile/main/images/logo/logo.png" title="Logo" alt="logo">
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td style="height:20px;">&nbsp;</td>
                      </tr>
                      <tr>
                        <td>
                          <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" style="max-width:670px;background:#fff;border-radius:3px;text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                            <tr>
                              <td style="height:40px;">&nbsp;</td>
                            </tr>
                            <tr>
                              <td>
                                <img src="https://raw.githubusercontent.com/ChienNguyen-i/profile/main/images/others/icon-message.png" alt="icon-message" width="22%">
                              </td>
                            </tr>
                            <tr>
                              <td style="height:40px;">&nbsp;</td>
                            </tr>
                            <tr>
                              <td style="padding:0 35px;">
                                <h1 style="color:#1e1e2d;font-weight:900;margin:0;font-size:32px;">CONGRATULATION</h1>
                                <p style="font-size:15px;color:#455056;margin:8px 0 0;line-height:24px;">You have new message from your website.</p>
                                <span style="display:inline-block;vertical-align:middle;margin:29px 0 26px;border-bottom:1px solid #cecece;width:100px;"></span>
                                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                  <tbody>
                                    <tr>
                                      <td style="font-size:12px;line-height:22px;color:#444444;padding-bottom:5px;font-weight:bold;text-align:center;">
                                        NAME
                                      </td>
                                    </tr>
                                    <tr>
                                      <td style="font-size:14px;line-height:24px;color:#444444;width:100%;height:37px;border:1px solid #dcdcdc;padding:5px 15px">` +
            nameInput.value +
            `
                                      </td>
                                    </tr>
                                    <tr>
                                      <td style="font-size:12px;line-height:22px;color:#444444;padding-bottom:5px;font-weight:bold;text-align:center;padding-top:18px;">
                                        PHONE
                                      </td>
                                    </tr>
                                    <tr>
                                      <td style="font-size:14px;line-height:24px;color:#444444;width:100%;height:37px;border:1px solid #dcdcdc;padding:5px 15px">
                                          ` +
            phoneInput.value +
            `
                                      </td>
                                    </tr>
                                    <tr>
                                      <td style="font-size:12px;line-height:22px;color:#444444;padding-bottom:5px;font-weight:bold;text-align:center;padding-top:18px;">
                                        EMAIL
                                      </td>
                                    </tr>
                                    <tr>
                                      <td style="font-size:14px;line-height:24px;color:#444444;width:100%;height:37px;border:1px solid #dcdcdc;padding:5px 15px">
                                          ` +
            emailInput.value +
            `
                                      </td>
                                    </tr>
                                    <tr>
                                      <td style="font-size:12px;line-height:22px;color:#444444;padding-bottom:5px;font-weight:bold;text-align:center;padding-top:18px;">
                                        SUBJECT
                                      </td>
                                    </tr>
                                    <tr>
                                      <td style="font-size:14px;line-height:24px;color:#444444;width:100%;height:37px;border:1px solid #dcdcdc;padding:5px 15px">
                                          ` +
            subjectInput.value +
            `
                                      </td>
                                    </tr>
                                    <tr>
                                      <td style="font-size:12px;line-height:22px;color:#444444;padding-bottom:5px;font-weight:bold;text-align:center;padding-top:18px;">
                                        MESSAGE
                                      </td>
                                    </tr>
                                    <tr>
                                      <td style="font-size:14px;line-height:24px;color:#444444;width:100%;height:37px;border:1px solid #dcdcdc;padding:5px 15px">
                                        ` +
            msgInput.value +
            `
                                      </td>
                                    </tr>
                                    <tr>
                                      <td style="font-size:12px;line-height:22px;color:#444444;padding-bottom:5px;font-weight:bold;text-align:center;padding-top:18px;">
                                        IP
                                      </td>
                                    </tr>
                                    <tr>
                                      <td style="font-size:14px;line-height:24px;color:#444444;width:100%;height:37px;border:1px solid #dcdcdc;padding:5px 15px">` +
            networkJson.details +
            `
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <span style="display:inline-block;vertical-align:middle;margin:29px 0 26px;border-bottom:1px solid #cecece;width:100px;"></span>
                                <br>
                                <a href="https://ipinfo.io/` +
            networkJson.ip +
            `
                                " target="_blank" style="background:#0099ff;text-decoration:none !important;display:inline-block;font-weight:500;color:#fff;font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">CHECK IP</a>
                                <a href="mailto:` +
            emailInput.value +
            `
                                ?subject=Reply to your message" style="background:#20e277;text-decoration:none !important;display:inline-block;font-weight:500;color:#fff;font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">REPLY</a>
                              </td>
                            </tr>
                            <tr>
                              <td style="height:40px;">&nbsp;</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="height:20px;">&nbsp;</td>
                      </tr>
                      <tr>
                        <td style="text-align:center;">
                          <p style="font-size:12px;color:rgba(69, 80, 86, 0.7411764705882353);line-height:18px;margin:0 0 0;">&copy; ` +
            new Date().getFullYear() +
            `
                          , made with ❤️ by <a href="https://chiennguyen-i.github.io/profile/" target="_blank" style="text-decoration:none;color:#0000ff;">CNX</a></p>
                        </td>
                      </tr>
                      <tr>
                        <td style="height:80px;">&nbsp;</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </body>`,
        });
      }
    }, 6000);
  }
});

document
  .querySelector("#btn-refresh-form-message")
  .addEventListener("click", function () {
    nameError.innerHTML = "";
    phoneError.innerHTML = "";
    emailError.innerHTML = "";
    emailCheck.innerHTML = "";
    subjectError.innerHTML = "";
    msgError.innerHTML = "";
    nameInput.style.border = "1px solid #b8b8b8";
    phoneInput.style.border = "1px solid #b8b8b8";
    emailInput.style.border = "1px solid #b8b8b8";
    subjectInput.style.border = "1px solid #b8b8b8";
    msgInput.style.border = "1px solid #b8b8b8";
  });

function copyText(text) {
  navigator.clipboard.writeText(text);
  createToast("success", "Copy success ✔");
}

var titleContent = " 📢 Welcome to the information page of CNX 🎉 ";
var speed = 200;
var customContent = null;

function customTitle() {
  document.title = titleContent;
  titleContent =
    titleContent.substring(1, titleContent.length) + titleContent.charAt(0);
  customContent = setTimeout("customTitle()", speed);
}

var api_key_weather = "edaf24e4ab72b408a4fa576f437bf437";
var w200 = document.querySelector("#w-200");
var w404 = document.querySelector("#w-404");
var cityNameInput = document.querySelector("#city-name-input");
var currentTemperature = document.querySelector("#current-temperature");
var feelsLikeTemperature = document.querySelector("#w-feels-like");
var currentCelsius = document.querySelector("#current-celsius");
var currentFahrenheit = document.querySelector("#current-fahrenheit");
var dayForecast = document.querySelector("#day-forecast");
var fiveDayForecast = document.querySelector("#five-day-forecast");
var currentTemp;
var feelsLikeTemp;
var listForecast = [];
var listFDayForecast = [];

const changeComment = () => {
  comments = [
    "Life is really simple, but we insist on making it complicated.",
    "Life is short, and it's up to you to make it sweet.",
    "Life is simple, it's just not easy.",
    "The best way to predict the future is to create it.",
    "Life is a journey that must be traveled no matter how bad the roads and accommodations.",
    "In the end, it's not the years in your life that count. It's the life in your years.",
    "Life is 10% what happens to us and 90% how we react to it.",
    "Life is too important to be taken seriously.",
    "Life is either a daring adventure or nothing at all.",
    "Life is 90% preparation and 10% perspiration.",
    "Life is a series of natural and spontaneous changes. Don't resist them; that only creates sorrow. Let reality be reality. Let things flow naturally forward in whatever way they like.",
    "Life is like riding a bicycle. To keep your balance, you must keep moving.",
    "Life is the art of drawing without an eraser.",
    "Life is a mirror and will reflect back to the thinker what he thinks into it.",
    "Life is like a camera. Focus on the good times, develop from the negatives, and if things don't work out, take another shot.",
    "Life is a journey, not a destination.",
    "Life is a collection of moments, let's make them memorable.",
    "Life is a precious gift, cherish every moment.",
    "Life is like a hot bath. It feels good while you're in it, but the longer you stay, the more wrinkled you get.",
    "Life is too short to worry about what other people think of you. Just be yourself and let them worry about their own lives.",
  ];
  document.querySelector("#comment-weather").innerHTML =
    comments[Math.floor(Math.random() * comments.length)];
};

const formatDate = (timestamp) => {
  let now = new Date();
  let date = now.getDate();
  let year = now.getFullYear();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  let month = months[now.getMonth()];
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let seconds = now.getSeconds();
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  document.querySelector("#current-day").innerHTML = "Today " + `${day}` + ",";
  return `${date}.${month}.${year}, ${hours}:${minutes}:${seconds}`;
};

const formatDay = (timestamp) => {
  let now = new Date(timestamp);
  let date = now.getDate();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  let month = months[now.getMonth()];
  return `${day},<br>${date}/${month}`;
};

const formatHours = (timestamp) => {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
};

const convertFahrenheitTemp = (temperature) => {
  let fahrenheitTemperature = (temperature * 9) / 5 + 32;
  return Math.round(fahrenheitTemperature);
};

const getUserCoordinates = () => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      const api_url = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${api_key_weather}`;
      fetch(api_url)
        .then((response) => response.json())
        .then((data) => {
          const { name } = data[0];
          showTemperature(name, latitude, longitude);
          showForecast(latitude, longitude);
        })
        .catch(() => {
          createToast(
            "error",
            "An error occurred while fetching the city name!"
          );
        });
    },
    (error) => {
      if (error.code === error.PERMISSION_DENIED) {
        createToast(
          "warning",
          "Geolocation request denied. Please reset location permission to grant access again."
        );
      } else {
        createToast(
          "error",
          "Geolocation request error. Please reset location permission."
        );
      }
    }
  );
};

const getCityCoordinates = () => {
  const cityName = cityNameInput.value.trim();
  if (cityName === "") {
    createToast("warning", "Please enter city name");
    return;
  }
  const api_url = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${api_key_weather}`;
  fetch(api_url)
    .then((response) => response.json())
    .then((data) => {
      if (!data.length)
        return createToast("warning", `No coordinates found for ${cityName}`);
      const { lat, lon, name } = data[0];
      showTemperature(name, lat, lon);
      showForecast(lat, lon);
    })
    .catch(() => {
      createToast("error", "An error occurred while fetching the coordinates!");
    });
};

const showTemperature = (name, latitude, longitude) => {
  const weather_api_url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${api_key_weather}&units=metric`;
  fetch(weather_api_url)
    .then((response) => response.json())
    .then((data) => {
      w200.style.display = "block";
      w404.style.display = "none";
      document.querySelector("#current-location").innerHTML = name;
      setInterval(() => {
        document.querySelector("#current-date").innerHTML = formatDate();
      }, 1000);
      document
        .querySelector("#icon-weather")
        .setAttribute(
          "src",
          `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        );
      currentTemperature.innerHTML = Math.round(data.main.temp);
      document.querySelector("#description-weather").innerHTML =
        data.weather[0].description;
      feelsLikeTemperature.innerHTML = Math.round(data.main.feels_like);
      document.querySelector("#w-clouds").innerHTML = data.clouds.all;
      document.querySelector("#w-humidity").innerHTML = data.main.humidity;
      document.querySelector("#w-sunrise").innerHTML = formatHours(
        data.sys.sunrise * 1000
      );
      document.querySelector("#w-wind-speed").innerHTML = data.wind.speed;
      document.querySelector("#w-pressure").innerHTML = data.main.pressure;
      document.querySelector("#w-visibility").innerHTML = data.visibility;
      document.querySelector("#w-sunset").innerHTML = formatHours(
        data.sys.sunset * 1000
      );
      currentTemp = Math.round(data.main.temp);
      feelsLikeTemp = data.main.feels_like;
      cityNameInput.value = "";
      changeComment();
    })
    .catch(() => {
      createToast(
        "error",
        "An error occurred while fetching the weather forecast!"
      );
    });
};

const showForecast = (latitude, longitude) => {
  const weather_api_url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${api_key_weather}&units=metric`;
  fetch(weather_api_url)
    .then((response) => response.json())
    .then((data) => {
      const uniqueForecastDays = [];
      const fiveDaysForecast = data.list.filter((forecast) => {
        const forecastDate = new Date(forecast.dt_txt).getDate();
        if (!uniqueForecastDays.includes(forecastDate)) {
          return uniqueForecastDays.push(forecastDate);
        }
      });
      dayForecast.innerHTML = null;
      fiveDayForecast.innerHTML = null;
      let forecast = null;
      let fDayForecast = null;
      for (let index = 0; index < 6; index++) {
        forecast = data.list[index];
        listForecast.push(forecast);
        dayForecast.innerHTML += `
        <div class="detail">
          <p>${formatHours(forecast.dt * 1000)}</p>
          <img src="http://openweathermap.org/img/wn/${
            forecast.weather[0].icon
          }@2x.png" />
          <p><span>${forecast.weather[0].description}<span></p>
          <p><span>${Math.round(
            forecast.main.temp_max
          )}°</span> / <span>${Math.round(forecast.main.temp_min)}°</span></p>
        </div>
        `;
      }
      for (let index = 1; index < fiveDaysForecast.length; index++) {
        fDayForecast = fiveDaysForecast[index];
        listFDayForecast.push(fDayForecast);
        fiveDayForecast.innerHTML += `
        <div class="detail">
          <p>${formatDay(fDayForecast.dt * 1000)}</p>
          <img src="http://openweathermap.org/img/wn/${
            fDayForecast.weather[0].icon
          }@2x.png" />
          <p><span>${fDayForecast.weather[0].description}<span></p>
          <p><span>${Math.round(
            fDayForecast.main.temp_max
          )}°</span> / <span>${Math.round(
          fDayForecast.main.temp_min
        )}°</span></p>
        </div>
        `;
      }
    })
    .catch(() => {
      createToast(
        "error",
        "An error occurred while fetching the weather forecast!"
      );
    });
};

const showFahrenheitTemperature = (event) => {
  event.preventDefault();
  currentCelsius.classList.remove("active");
  currentFahrenheit.classList.add("active");
  currentTemperature.innerHTML = convertFahrenheitTemp(currentTemp);
  feelsLikeTemperature.innerHTML = convertFahrenheitTemp(feelsLikeTemp);
  let list = listForecast;
  let listFive = listFDayForecast;
  dayForecast.innerHTML = null;
  fiveDayForecast.innerHTML = null;
  let forecast = null;
  let fiveForecast = null;
  for (let index = 0; index < list.length; index++) {
    forecast = list[index];
    dayForecast.innerHTML += `
    <div class="detail">
      <p>${formatHours(forecast.dt * 1000)}</p>
      <img src="http://openweathermap.org/img/wn/${
        forecast.weather[0].icon
      }@2x.png" />
      <p><span>${forecast.weather[0].description}<span></p>
      <p><span>${convertFahrenheitTemp(
        forecast.main.temp_max
      )}°</span> / <span>${convertFahrenheitTemp(
      forecast.main.temp_min
    )}°</span></p>
    </div>
    `;
  }
  for (let index = 0; index < listFive.length; index++) {
    fiveForecast = listFive[index];
    fiveDayForecast.innerHTML += `
    <div class="detail">
      <p>${formatDay(fiveForecast.dt * 1000)}</p>
      <img src="http://openweathermap.org/img/wn/${
        fiveForecast.weather[0].icon
      }@2x.png" />
      <p><span>${fiveForecast.weather[0].description}<span></p>
      <p><span>${convertFahrenheitTemp(
        fiveForecast.main.temp_max
      )}°</span> / <span>${convertFahrenheitTemp(
      fiveForecast.main.temp_min
    )}°</span></p>
    </div>
    `;
  }
};

const showCelsiusTemperature = (event) => {
  event.preventDefault();
  currentCelsius.classList.add("active");
  currentFahrenheit.classList.remove("active");
  currentTemperature.innerHTML = Math.round(currentTemp);
  feelsLikeTemperature.innerHTML = Math.round(feelsLikeTemp);
  dayForecast.innerHTML = null;
  fiveDayForecast.innerHTML = null;
  let forecast = null;
  let fiveForecast = null;
  for (let index = 0; index < listForecast.length; index++) {
    forecast = listForecast[index];
    dayForecast.innerHTML += `
    <div class="detail">
      <p>${formatHours(forecast.dt * 1000)}</p>
      <img src="http://openweathermap.org/img/wn/${
        forecast.weather[0].icon
      }@2x.png" />
      <p><span>${forecast.weather[0].description}<span></p>
      <p><span>${Math.round(
        forecast.main.temp_max
      )}°</span> / <span>${Math.round(forecast.main.temp_min)}°</span></p>
    </div>
    `;
  }
  for (let index = 0; index < listFDayForecast.length; index++) {
    fiveForecast = listFDayForecast[index];
    fiveDayForecast.innerHTML += `
    <div class="detail">
      <p>${formatDay(fiveForecast.dt * 1000)}</p>
      <img src="http://openweathermap.org/img/wn/${
        fiveForecast.weather[0].icon
      }@2x.png" />
      <p><span>${fiveForecast.weather[0].description}<span></p>
      <p><span>${Math.round(
        fiveForecast.main.temp_max
      )}°</span> / <span>${Math.round(fiveForecast.main.temp_min)}°</span></p>
    </div>
    `;
  }
};

document
  .querySelector("#btn-get-location")
  .addEventListener("click", getUserCoordinates);

document
  .querySelector("#frmWeather")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    getCityCoordinates();
  });

currentCelsius.addEventListener("click", showCelsiusTemperature);
currentFahrenheit.addEventListener("click", showFahrenheitTemperature);

customTitle();
getIPAddress();
loadSong();
