export default class ToWords {
    constructor(sum) {  
      this.sum = sum;
    }
    get GetWords() {
      const vienetaiNames = ["","vienas","du","trys","keturi","penki","šeši","septyni","aštuoni","devyni","dešimt","venuolika","dvylika","trylika","keturiolika","penkiolika","šešiolika","septyniolika","aštuoniolika","devyniolika"];
      //const iolika = ["dešimt","venuolika","dvylika","trylika","keturiolika","penkiolika","šešiolika","septyniolika","aštuoniolika","devyniolika"];
      const desimtysNames = ["","","dvidešimt","trisdešimt","keturiasdešimt","penkiasdešimt","šešiasdešimt","septyniasdešimt","aštuoniasdešimt","devyniasdešimt"];
      const simtaiNames = {vnt:"šimtas",ko:"šimtų",dgs:"šimtai"};
      const tukstNames = {vnt:"tūkstantis",ko:"tūkstančių",dgs:"tūkstančiai"};
      const valiutos = {vnt:"euras", ko:"eurų", dgs:"eurai"};
      
      let sum = this.sum;
      let kablelioVieta = sum.toString().indexOf('.');
      //let visoSkaiciu = sum.toString().length;
      let sumArr = sum.toString().split('');
      let sveiki = sum.toFixed(0);
      let visoSveiku = sveiki.toString().length;
      let poKablelio = sum.toString().substring(kablelioVieta + 1);
      let sveikiArr = sumArr.slice(0, kablelioVieta);
      //let poKablelioArr = sumArr.slice(kablelioVieta + 1, visoSkaiciu)
  
      function getValiuta(skArr){
          let sk = skArr.slice(visoSveiku - 2).length === 1 ? Number(skArr[skArr.length - 1]) : Number(String(skArr[skArr.length - 2]) + String(skArr[skArr.length - 1]));
          let lastSk = Number(skArr[skArr.length - 1]);
          if (Number(sk) === 0 || lastSk === 0) return " " + valiutos.ko;
          else if (Number(sk) > 9 & Number(sk) < 20) return " " + valiutos.ko;
          else if (Number(sk) === 1 || lastSk === 1) return " " + valiutos.vnt;
          else return " " + valiutos.dgs;
      }
      
      function getPoKablelio(){
          return `, ${poKablelio} ct.`
      }
      function getNulis(sk){
          return `nulis ${getValiuta(sk)}`;
      }
      function getVienetai(sk){
          return `${vienetaiNames[sk]}`;
      }
      function getNiolika(sk) {
          return `${vienetaiNames[sk]}`;
      }
      function getDesimtys(skArr){
          let sk = skArr[1] === undefined ? Number(skArr[0]) : Number(skArr[0] + skArr[1]);
          if (sk < 1) return getNulis(sk);
          else if (sk < 10) return `${getVienetai(sk)}`;
          else if (sk < 20) return `${getNiolika(sk)}`;  
          else return `${desimtysNames[skArr[0]]} ${getVienetai(skArr[1])}`;
      }
      function getSimtai(skArr) {
          if (skArr[2] === undefined) return getDesimtys(skArr);
          if (Number(skArr[0]) === 0) return getDesimtys(skArr.slice(1));
          let simt = Number(skArr[0]) === 1 ? simtaiNames.vnt : simtaiNames.dgs;
          return `${getVienetai(skArr[0])} ${simt} ${getDesimtys(skArr.slice(1))}`;
      }
      function getTukstanciai(skArr) {
          function getName (arr){
              let last = arr[arr.length -1];
              if (Number(last) === 0) return tukstNames.ko;
              if (Number(last) === 1) return tukstNames.vnt;
              return tukstNames.dgs;
          }
          let simtaiArr = skArr.slice(visoSveiku - 3);
          let tukstArr = skArr.slice(0, visoSveiku - 3)
          return `${getSimtai(tukstArr)} ${getName(tukstArr)} ${getSimtai(simtaiArr)}`;
      }
      
      if (sum < 1000) return getSimtai(sveikiArr) + getValiuta(sveikiArr) + getPoKablelio();
      else if (sum < 1000000) return getTukstanciai(sveikiArr) + getValiuta(sveikiArr) + getPoKablelio();
      return "--";
    }
  }
