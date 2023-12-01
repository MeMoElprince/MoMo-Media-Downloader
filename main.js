const Theme = document.querySelector('.view');
const icon = document.getElementById('themeicon')
const Main = document.getElementById('main');
const Lang = document.querySelector('.lang');
const btns = document.querySelectorAll('.btns');
const Error = document.querySelector('.error');
const country = document.querySelector('.country');

const list = document.querySelector('ul');
const span = document.querySelector('span');
const downloadbtn = document.getElementById('downloadbtn')
const input = document.getElementById('url');

const Languages = {
  'العربية':{
    support:"ندعم",
    youtube:'يوتيوب',
    instagram:'انستجرام',
    facebook:'فيسبوك',
    download:'تنزيل',
    placeholder:'الرابط هنا.....',
    error:{
      quality:'رجاءً اختر الجودة التي تريدها',
      urlempty:'رجاءً اكتب في الاسفل رابط الميديا الذي تريد تحميلها',
      urlwrong:'هذا الرابط غير صحيح تاكد من صحته و تاكد ان الموقع من المواقع المدعومة من قبلنا'
    }
  },
  'EN':{
    support:"Support",
    youtube:'Youtube',
    instagram:'Instagram',
    facebook:'Facebook',
    download:'Download',
    placeholder:'URL here.....',
    error:{
      quality:'Pleace select quality for your media!',
      urlempty:'Pleace type down your media link!',
      urlwrong:'This url is incorrect. make sure that the site is one of the sites supported by us'
    }
  }
}
const Supported = {
  youtube:'youtube.com/',
  facebook:'facebook.com/',
  instagram:'instagram.com/'
}

// handle theme settings

Theme.addEventListener('click',()=>{
  if(Main.classList.contains('white')){
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
    icon.style.color="#ffdd00";
    Main.classList.remove('white');
  }else{
    icon.classList.add('fa-moon');
    icon.style.color="#000000";
    icon.classList.remove('fa-sun');
    Main.classList.add('white');
  }
});

// handle langauages changes

function LangChange(type){
  list.children[0].textContent = Languages[type].youtube;
  list.children[1].textContent = Languages[type].facebook;
  list.children[2].textContent = Languages[type].instagram;

  span.textContent = Languages[type].support;

  downloadbtn.textContent = Languages[type].download;

  input.placeholder = Languages[type].placeholder;
  
  if(!Error.classList.contains('hidden'))handleErrorMessage();
}

Lang.addEventListener('click',()=>{
  if(Lang.textContent==='العربية'){
    Lang.textContent='EN';
    Main.classList.remove('arabic');
    LangChange('EN');
  }else {
    Lang.textContent='العربية';
    Main.classList.add('arabic');
    LangChange('العربية');
  }
})

// handle download btn

function handleErrorMessage(){
  let Contains = false;
  btns.forEach(el=>{
    if(el.classList.contains('choosen'))
      Contains=true;
  })
  
  // down here i handled when i click download btn and qualitybtn is presed or no and input feild is empty or no
  if(Contains){
    Error.classList.add('hidden');
    if(input.value===''){
      Error.classList.remove('hidden');
      Error.textContent = Languages[Lang.textContent].error.urlempty;
    }else{
      Error.classList.add('hidden');
      // 12 start
      let str = input.value.substring(12);
      if(str===Supported.youtube || str===Supported.facebook || str===Supported.instagram){
        Error.classList.add('hidden');
      }else{
        Error.textContent = Languages[Lang.textContent].error.urlwrong;
        Error.classList.remove('hidden'); 
      }
    }
  }else{
    Error.textContent = Languages[Lang.textContent].error.quality;
    Error.classList.remove('hidden'); 
  }
}
downloadbtn.addEventListener('click',()=>{
  handleErrorMessage();
})

// handle quality btns
function removeAll(){
  btns.forEach(el=>{
    el.classList.remove('choosen');
  })
}
btns.forEach(el=>{
  el.addEventListener('click',()=>{
    let test = false;
    if(el.classList.contains('choosen'))test=true;
    removeAll();
    if(!test)el.classList.add('choosen');
    else el.classList.remove('choosen');
  })
})


// handle fetch country flag
fetch('http://ip-api.com/json/?fields=61439')
.then(Response=>Response.json())
.then(data=>country.textContent=data.country);