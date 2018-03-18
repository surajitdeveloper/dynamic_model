function get_url(obj)
{
  var ret_str = "?";
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
        ret_str += key+"="+obj[key]+"&";
    }
  }
  var ret_str = ret_str.slice(0, -1);
  return ret_str;
}
function convert(str) {
  var date = new Date(str),
      mnth = ("0" + (date.getMonth()+1)).slice(-2),
      day  = ("0" + date.getDate()).slice(-2);
  return [ date.getFullYear(), mnth, day ].join("-");
}
function getIdStr(StrSelArr, StrfullArr, strIdArr)
{
  var ret_arr = "";
  if(StrSelArr.length > 0)
  {
    angular.forEach(StrSelArr, function (element, index) 
    {
      ret_arr += strIdArr[StrfullArr.indexOf(element)]+",";
    });
    return ret_arr.slice(0,-1);
  }
  else
  {
    return "";
  }
}
function fileSelected(inputObj, type){
  var fileObj = inputObj.files[0];
  var webworkerReader = new FileReader();

 webworkerReader.onload = function(fileLoadedEvent){
   //var binaryStr = webworkerReader.result;
   //var base64Str = btoa(binaryStr);
   //alert(fileLoadedEvent.target.result);
  if(type == "profilePicture") localStorage.profilepic = fileLoadedEvent.target.result;
  if(type == "practiceCertificate") localStorage.practiceCertificate = fileLoadedEvent.target.result;
  if(type == "registrationCertificate") localStorage.registrationCertificate = fileLoadedEvent.target.result;
 };   
 webworkerReader.readAsDataURL(fileObj);
}
angular.module('starter.controllers', ["ngStorage"])

  .controller("BMDCtrlProfile", function ($ionicHistory, $state, $scope, $ionicModal, $timeout, $http, $sessionStorage, $window, searchdate, $rootScope, $ionicLoading)
{
    $scope.degreeList = [];
    $scope.degreeListMain = [];
    $scope.degreeid = [];

    $scope.splList = [];
    $scope.spListMain = [];
    $scope.spListid = [];



    $scope.langList = [];
    $scope.langListMain = [];
    $scope.langListid = [];

    $scope.languages = [];

    $scope.location_data = []; 
    $scope.location_data = ($sessionStorage.location_data != undefined) ? JSON.parse($sessionStorage.location_data) : [];
    $scope.degreeListMain = ($sessionStorage.degreeListMain != undefined) ? JSON.parse($sessionStorage.degreeListMain) : [];
    $scope.degreeList = ($sessionStorage.degreeList != undefined) ? JSON.parse($sessionStorage.degreeList) : [];
    $scope.degreeid = ($sessionStorage.degreeid != undefined) ? JSON.parse($sessionStorage.degreeid) : [];
    $scope.splList = ($sessionStorage.splList != undefined) ? JSON.parse($sessionStorage.splList) : [];
    $scope.spListid = ($sessionStorage.spListid != undefined) ? JSON.parse($sessionStorage.spListid) : [];
    $scope.spListMain = ($sessionStorage.spListMain != undefined) ? JSON.parse($sessionStorage.spListMain) : [];
    $scope.langListMain = ($sessionStorage.langListMain != undefined) ? JSON.parse($sessionStorage.langListMain) : [];
    $scope.langList = ($sessionStorage.langList != undefined) ? JSON.parse($sessionStorage.langList) : [];
    $scope.langListid = ($sessionStorage.langListid != undefined) ? JSON.parse($sessionStorage.langListid) : [];
    console.log($scope.baseurl);
    function getStrArr(idStr, type) //, StrfullArr, strIdArr
    {
      //console.log(myarr);
      var ret_arr = [];
      if (idStr != null && idStr != undefined && idStr != "") {
        var myarr = idStr.split(",");
        if (myarr.length > 0) {
          var StrfullArr = [];
          var strIdArr = [];
          if (type == "degree") {
            StrfullArr = $scope.degreeList; strIdArr = $scope.degreeid;
          }
          if (type == "lang") {
            StrfullArr = $scope.langList; strIdArr = $scope.langListid;
          }
          if (type == "spl") {
            StrfullArr = $scope.splList; strIdArr = $scope.spListid;
          }
          angular.forEach(myarr, function (element, index) {
            if (element != undefined && element != "undefined") {
              ret_arr.push(StrfullArr[strIdArr.indexOf(element)]);
            }
          });
        }
      }
      return ret_arr;
    }
    $scope.show_image = function (imgtype) {
      var docprofile1 = JSON.parse($sessionStorage.userSession);
      //$scope.docprof = docprofile.data[0];
      //let docprofile = docprofile1.data[0];
      let docprofile = docprofile1[0];
      console.log(docprofile);
      if (imgtype == "profimg") $scope.img_url = docprofile.display_image;
      if (imgtype == "regtCert") $scope.img_url = docprofile.experience_certificate;
      if (imgtype == "PracCert") $scope.img_url = docprofile.experience_certificate;

      $scope.show_pic.show();

    }
    $scope.loadprof = function () {
      if ($sessionStorage.userSession != undefined) {
        $scope.selectedcity = false;
        $scope.docprof = {};
        //console.log($sessionStorage.userSession);
        let docprofile1 = JSON.parse($sessionStorage.userSession);
        //$scope.docprof = docprofile.data[0];
        let docprofile = docprofile1[0];
        //console.log(docprofile.doctor_firstname);
        //console.log("prof");
        //console.log(docprofile);

        $scope.current_location = 0;

        $scope.profimg = false;

        $scope.PracCert = false;

        $scope.regtCert = false;


        if (docprofile.display_image != null) $scope.profimg = true;

        if (docprofile.experience_certificate != null) $scope.regtCert = true;

        if (docprofile.practise_certificate != null) $scope.PracCert = true;

        //console.log(docprofile.doctor_degree);

        //console.log($scope.degreeList);

        //console.log($scope.degreeid);

        $scope.docprof.degreeList = getStrArr(docprofile.doctor_degree, "degree");

        //console.log($scope.degreeList);

        //console.log($scope.degreeid);

        //console.log(getStrArr(docprofile.doctor_degree, $scope.degreeList, $scope.degreeid));

        $scope.change_location = function (data) {
          $scope.current_location = data;
        }

        $scope.docprof.doctor_degree = getStrArr(docprofile.doctor_degree, "degree");;

        $scope.docprof.doctor_languages = getStrArr(docprofile.doctor_languages, "lang");;

        $scope.docprof.doctor_speciality = getStrArr(docprofile.specialty, "spl");;

        $scope.docprof.firstname = docprofile.doctor_firstname;

        $scope.docprof.lastname = docprofile.doctor_lastname;

        $scope.location_str_old = docprofile.location_str;

        $scope.docprof.gender = docprofile.doctor_sex;//////sar

        $scope.docprof.about_doctor = docprofile.about_doctor;

        $scope.docprof.doctor_office_country = docprofile.doctor_office_country;

        $scope.docprof.doctor_office_address = docprofile.doctor_office_address;

        $scope.docprof.doctor_office_state = docprofile.doctor_office_state;

        $scope.docprof.doctor_office_city = docprofile.doctor_office_city;

        $scope.docprof.doctor_office_zip = docprofile.doctor_office_zip;

        //$scope.docprof.location = docprofile.cities_id;

        //$scope.selectesingleLocation = docprofile.cities_id;


        //alert($scope.location_data.length);
        if (docprofile.cities_id != "") {
          if ($scope.location_data.length > 0) {
            for (let i = 0; i < $scope.location_data.length; i++) {
              if ($scope.location_data[i].id == docprofile.cities_id) {
                $scope.selectesingleLocation = $scope.location_data[i];
              }
            }
          }
        }

        //$scope.docprof.location = 4;

        $scope.lat = undefined;
        $scope.lng = undefined;
        $scope.location_str = undefined;

        $scope.$on('gmPlacesAutocomplete::placeChanged', function(){
          //console.log($scope.docprof.location_data);
          
          let place = $scope.docprof.location_data.getPlace();
          let location = place.geometry.location;
          //console.log($scope.docprof.location_data.gm_accessors_.place.gd.formattedPrediction);
          //console.log($scope.docprof.location_data.getPlace());
          $scope.lat = location.lat();
          $scope.lng = location.lng();
          localStorage.selLat = $scope.lat;
          localStorage.selLng = $scope.lng;
          //console.log($scope.docprof.location_data.gm_accessors_.gd.formattedPrediction);
          $scope.location_str = place.formatted_address;
          //alert(location.lat());
          //console.log($scope.docprof.location_data);
          
          localStorage.selLocation_str = $scope.location_str;
          //console.log($scope.lat);
          $scope.$apply();
      });

      }
    }
    
    $scope.docProfUpdate = function (data) {

      var doctor_degree = data.doctor_degree;

      var doctor_languages = data.doctor_languages;

      var doctor_speciality = data.doctor_speciality;


      data.doctor_speciality = "";

      data.doctor_degree = getIdStr(doctor_degree, $scope.degreeList, $scope.degreeid);

      data.doctor_language = getIdStr(doctor_languages, $scope.langList, $scope.langListid);


      data.doctor_speciality = getIdStr(doctor_speciality, $scope.splList, $scope.spListid);

      data.firstname = (data.firstname != undefined) ? data.firstname : "";

      data.lastname = (data.lastname != undefined) ? data.lastname : "";

      data.email = (data.email != undefined) ? data.email : "";

      data.gender = (data.gender != undefined) ? data.gender : "";

      data.doctor_experience = (data.doctor_experience != undefined) ? data.doctor_experience : "";

      data.about_doctor = (data.about_doctor != undefined) ? data.about_doctor : "";

      data.phone = (data.phone != undefined) ? data.phone : "";

      data.doctor_office_country = (data.doctor_office_country != undefined) ? data.doctor_office_country : "";

      data.doctor_office_address = (data.doctor_office_address != undefined) ? data.doctor_office_address : "";

      data.doctor_office_state = (data.doctor_office_state != undefined) ? data.doctor_office_state : "";

      data.doctor_office_city = (data.doctor_office_city != undefined) ? data.doctor_office_city : "";

      data.doctor_office_zip = (data.doctor_office_zip != undefined) ? data.doctor_office_zip : "";

      let docprofile1 = JSON.parse($sessionStorage.userSession);

      let docprofile = docprofile1[0];

      data.profile_pic = (localStorage.profilepic == "") ? docprofile.display_image : localStorage.profilepic; //

      data.experience_certificate = (localStorage.registrationCertificate == "") ? docprofile.experience_certificate : localStorage.registrationCertificate; // 

      data.practise_certificate = (localStorage.practiceCertificate == "") ? docprofile.practise_certificate : localStorage.practiceCertificate; //

      localStorage.profilepic = "";

      localStorage.registrationCertificate = "";

      localStorage.practiceCertificate = "";

      if ($sessionStorage.doctor_id != undefined) {
        var data1 = [];
        $ionicLoading.show({
          template: '<img  src="img/loading.gif" />'
        });
        data.id = $sessionStorage.doctor_id;
        data.location = $scope.current_location;
        var sendvar =
          {
            id: data.id,
            firstname: data.firstname,
            lastname: data.lastname,
            email: $sessionStorage.doctor_email,
           // gender: $sessionStorage.doctor_gender,
            gender: data.gender,
            location: data.location,
            doctor_degree: data.doctor_degree,
            doctor_speciality: data.doctor_speciality,
            doctor_language: data.doctor_language,
            experience_certificate: data.experience_certificate,
            practise_certificate: data.practise_certificate,
            doctor_experience: data.doctor_experience,
            about_doctor: data.about_doctor,
            phone: $sessionStorage.doctor_phone,
            doctor_office_country: data.doctor_office_country,
            doctor_office_address: data.doctor_office_address,
            doctor_office_state: data.doctor_office_state,
            doctor_office_city: data.doctor_office_city,
            doctor_office_zip: data.doctor_office_zip,
            profile_pic: data.profile_pic,
            lat: localStorage.selLat,
            lng: localStorage.selLng,
            location_str: localStorage.selLocation_str
          }
        console.log("eygre"+sendvar.location);


        data1[0] = sendvar;
        console.log(data1);
        $http({
          url: $scope.baseurl + "/updatedoctorprof",
          method: "POST",
          data: data1
        }).then(function success(response) {
          $ionicLoading.hide();


          alert("Saved Successfully");


          $sessionStorage.userSession = JSON.stringify(response.data.Doctor_data);

          window.location.href = "#/app/home";

        });
      }
    }
    $ionicModal.fromTemplateUrl('templates/show_img.html', {
      scope: $scope,
      caching: false
    }).then(function (show_pic) {
      $scope.show_pic = show_pic;
    });
    $scope.closePicdet = function () {
      $scope.show_pic.hide();
    }
})
.controller("HomeCtrl", function($ionicHistory, $state, $scope, $ionicModal, $timeout, $http, $sessionStorage, $window, searchdate, $rootScope, $ionicLoading)
{
  $scope.name = "";
  $scope.doctor = false;
  if($sessionStorage.doctorlogin)
  {
    let docdata1 = JSON.parse($sessionStorage.userSession);
    let doc_moda = docdata1[0];
    $scope.name = docdata.doctor_firstname+" "+docdata.doctor_lastname;
    $scope.doctorlogin = true;
  }
  if($sessionStorage.patientlogin)
  {
    $scope.name = $sessionStorage.userSession.name;
    $scope.patientlogin = true;
  }
  

})
.controller('AppCtrl', function ($interval,$ionicHistory,$state,$scope, $ionicModal, $timeout,$http, $sessionStorage,$window,searchdate,$rootScope,$ionicLoading) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  //$sessionStorage.userSessionStatus = true;

  $scope.doctorlogin = ($sessionStorage.doctorlogin)?true:false;

  $scope.noSessionStatus = ($sessionStorage.userSessionStatus)?false:true;

  $scope.userSessionStatus = ($sessionStorage.userSessionStatus)?true:false;
  
  // Form data for the login modal
 
  $scope.Doc={};
  
  $scope.AppointmentDetails={};
  $scope.desiredSearchData = {};
  $scope.desiredSearchData.speciality = '';
  $scope.desiredSearchData.insurance = '';
  $scope.desiredSearchData.location = '';
  $scope.desiredSearchData.selectedDate = new Date();
  $scope.desiredSearchData.page=0;
  $scope.desiredSearchData.status='first';
  //$scope.coreurl="http://localhost/bookmydoc_new_theme/";
  $scope.coreurl=coreurl;
  $scope.baseurl=baseurl;
  $scope.my_key=my_key;
  
  

  

  
  //$scope.roles = ($sessionStorage.roles != undefined)?JSON.parse($sessionStorage.roles):[];
  //console.log()

  
  // Create the login modal that we will use later
  /*$ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope,
    caching: false
  }).then(function(modal) {
    $scope.modal = modal;
  });
    $ionicModal.fromTemplateUrl('templates/signup.html', {
    scope: $scope,
    caching: false
  }).then(function(signup_modal) {
    $scope.signup_modal = signup_modal;
  });

  $ionicModal.fromTemplateUrl('templates/signup_doctor.html', {
    scope: $scope,
    caching: false
  }).then(function(signup_doctor_modal) {
    $scope.signup_doctor_modal = signup_doctor_modal;
  });

  $ionicModal.fromTemplateUrl('templates/login_doctor.html', {
    scope: $scope,
    caching: false
  }).then(function(modal_doctor) {
    $scope.modal_doctor = modal_doctor;
  });

  $ionicModal.fromTemplateUrl('templates/forgot_password.html', {
    scope: $scope,
    caching: false
  }).then(function(reset_modal) {
    $scope.reset_modal = reset_modal;
  });*/
  $ionicModal.fromTemplateUrl('templates/doc_modal.html', {
    scope: $scope,
    caching: false
  }).then(function(doc_modal) {
    $scope.doc_modal = doc_modal;
  });
  

  // Triggered in the login modal to close it
  /*$scope.closeLogin = function() {
    $scope.modal.hide();
  };
  $scope.closeDocLogin = function()
  {
    $scope.modal_doctor.hide();
  }
  $scope.closeSignup = function() {
    $scope.signup_modal.hide();
  };
  $scope.closeForgot = function() {
    $scope.reset_modal.hide();
  };
 

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  $scope.signup = function() {
    $scope.signup_modal.show();
  };
    $scope.reset = function() {
    $scope.reset_modal.show();
  };
  $scope.doc_modal = function() {
    $scope.doc_modal.show();
  };
  $scope.join = function() {
    $scope.modal.hide();
    $scope.signup_modal.show();
    $scope.signup_doctor_modal.hide();//////////////////////////////////////////////////////sar
  };
  */
$scope.times = [];
$scope.submitschedule = function(data)
{
  if(data != undefined)
  {
    //console.log(data.mon);
    data.mon = (data.mon != undefined)?data.mon:{start: "", end: ""};
    data.tue = (data.tue != undefined)?data.tue:{start: "", end: ""};
    data.wed = (data.wed != undefined)?data.wed:{start: "", end: ""};
    data.thu = (data.thu != undefined)?data.thu:{start: "", end: ""};
    data.fri = (data.fri != undefined)?data.fri:{start: "", end: ""};
    data.sat = (data.sat != undefined)?data.sat:{start: "", end: ""};
    data.sun = (data.sun != undefined)?data.sun:{start: "", end: ""};
    
    //console.log(data);
    var url='/scheduleWorkPlan';
    var new_var = {};
    if($sessionStorage.doctor_id != undefined)
    {
      var doctor_id = $sessionStorage.doctor_id;
      new_var.id = doctor_id;
      new_var.work = data;
      console.log(new_var);
      $ionicLoading.show({
        template: '<img src="img/loading.gif" />'
      });
      $http({
        url: $scope.baseurl+url, 
        method: "POST",
        data: new_var
      }).then(function mySucces(response) {
        $ionicLoading.hide();
        alert("save Successfully");
          if(response.data.status == "Success")
          {
            $sessionStorage.userSession = JSON.stringify(response.data.Doctor_data);
            console.log(response.data.Doctor_data[0]);
            $timeout(function() {
              $ionicLoading.hide();
            }, 1000);
          }
      });
    }
  }
}
$scope.submitbrake = function(data)
{
  if(data != undefined)
  {
     //console.log(data);
     var url='/scheduleBreakPlan';
     var new_var = {};
     if($sessionStorage.doctor_id != undefined)
     {
       var doctor_id = $sessionStorage.doctor_id;
       var mon = (data.mon != undefined)?JSON.stringify(data.mon): "";
       var tue = (data.tue != undefined)?JSON.stringify(data.tue): "";
       var wed = (data.wed != undefined)?JSON.stringify(data.wed): "";
       var thu = (data.thu != undefined)?JSON.stringify(data.thu): "";
       var fri = (data.fri != undefined)?JSON.stringify(data.fri): "";
       var sat = (data.sat != undefined)?JSON.stringify(data.sat): "";
       var sun = (data.sun != undefined)?JSON.stringify(data.sun): "";
       console.log(mon);
       new_var.id = doctor_id;
       new_var.break = data;
       new_var.break.mon = [];
       new_var.break.mon[0] = (mon != "")?JSON.parse(mon):{start: "", end: ""};
    
       new_var.break.tue = [];
       new_var.break.tue[0] = (tue != "")?JSON.parse(tue):{start: "", end: ""};

       new_var.break.wed = [];
       new_var.break.wed[0] = (wed != "")?JSON.parse(wed):{start: "", end: ""};

       new_var.break.thu = [];
       new_var.break.thu[0] = (thu != "")?JSON.parse(thu):{start: "", end: ""};

       new_var.break.fri = [];
       new_var.break.fri[0] = (fri != "")?JSON.parse(fri):{start: "", end: ""};

       new_var.break.sat = [];
       new_var.break.sat[0] = (sat != "")?JSON.parse(sat):{start: "", end: ""};

       new_var.break.sun = [];
       new_var.break.sun[0] = (sun != "")?JSON.parse(sun):{start: "", end: ""};
       console.log(new_var);
       $ionicLoading.show({
         template: '<img  src="img/loading.gif" />'
       });
       $http({
         url: $scope.baseurl+url, 
         method: "POST",
         data: new_var
       }).then(function mySucces(response) {
         $ionicLoading.hide();
         alert("save Successfully");
           if(response.data.status == "Success")
           {
            $sessionStorage.userSession = JSON.stringify(response.data.Doctor_data);
            console.log(response.data.Doctor_data[0]);
             $timeout(function() {
               $ionicLoading.hide();
            }, 1000);
           }
           
       });
     }
    
  }
}
$scope.submitvaccation = function(data)
{
  if(data != undefined)
  {
    //console.log(data);
    if(data.startdate != undefined && data.enddate != undefined)
    {
      console.log(data.startdate);
      var startdate = convert(data.startdate);
      var enddate = convert(data.enddate);
      var output_var = {};
      if($sessionStorage.doctor_id != undefined)
      {
        output_var.id = $sessionStorage.doctor_id;
        output_var.vacation = [];
        output_var.vacation[0] = {startdate: startdate, enddate: enddate};
        $ionicLoading.show({
          template: '<img  src="img/loading.gif" />'
        });
        var url='/scheduleVacationPlan';
        $http({
          url: $scope.baseurl+url, 
          method: "POST",
          data: output_var
        }).then(function mySucces(response) {
          $ionicLoading.hide();
          alert("save Successfully");
            if(response.data.status == "Success")
            {
              $sessionStorage.userSession = JSON.stringify(response.data.Doctor_data);
              console.log(response.data.Doctor_data[0]);
              
              $timeout(function() {
                $ionicLoading.hide();
             }, 1000);
            }
        });
      }
    }
  }
}
for(i = 0; i < 24; i++)
{
  if(i < 12)
  {
    if(i < 10)
    {
      $scope.times.push("0"+i+":00 AM");
    }
    else
    {
      $scope.times.push(i+":00 AM");
    }
  }
  else
  {
    if(i-12 < 10)
    {
      var time = (i-12 == 0)?12:"0"+(i-12);
      $scope.times.push(time+":00 PM");
    }
    else
    {
      $scope.times.push((i-12)+":00 PM");
    }
  }
}

    /*$scope.doctorSignup = function()
    {
      $scope.signup_modal.hide();
      $scope.signup_doctor_modal.show();
    }
    $scope.closeDoctorSignup = function()
    {
      $scope.signup_doctor_modal.hide();
      //$scope.modal_doctor.show();///////////////////////////////sar
    }
    $scope.docLogin = function()
    {
      $scope.modal.hide();
      $scope.modal_doctor.show();
    }*/

    $scope.lat = "";
    $scope.lng = "";
    $scope.location_str = "";
    $scope.localLocation = localStorage.selLocation_str;
    $interval(function () {
      $scope.localLocation = localStorage.selLocation_str;
    }, 2000);
    
    //$scope.location_data = localStorage.formatted_address;
    $ionicHistory.clearCache();
    $scope.my_booking =function(){
      $ionicHistory.clearCache();
      $ionicHistory.nextViewOptions({ disableBack: true });
      $state.go('app.my_booking');
    }
    /*$scope.doForgot =function(){
      //console.log($scope.resetData);
    }*/

    $scope.Logout = function() {
      $sessionStorage.userSession = '';
      $sessionStorage.doctorlogin = false;
      $sessionStorage.patientlogin = false;
      $sessionStorage.doctor_id = "";
      $sessionStorage.userSessionStatus = false;
      $scope.userSessionStatus = false;
      $scope.noSessionStatus = true;
      $scope.doctorlogin = false;
      $scope.patientlogin = false;
      $window.location.href = '#/app/home';
      $window.location.reload(true);
    }

    $scope.get_appointments = function(){
      //console.log('appointment');
      $scope.loading=true;
      $scope.loadingpart=false;
      $ionicHistory.nextViewOptions({ disableBack: true });
      var url='/get_appointment';
      $http({
          url: $scope.baseurl+url, 
          method: "POST",
          //data: {'user_id':$scope.userSession.userID},
          data: {'user_id':$sessionStorage.userSession.userID}
        }).then(function mySucces(response) {
            $scope.AppointmentList = response.data; 
            //console.log($scope.AppointmentList);
            $timeout(function() {
              $scope.loading = false; 
              $scope.loadingpart = ($scope.AppointmentList.status) ? true :false;
              $scope.AppointmentStatus = ($scope.AppointmentList.status==false) ? true :false;
            }, 1000);
        });
      };

      $scope.view_doc = function(id){
        $scope.doc_popup_id=id;
        //console.log(id);
        var url='/get_doctor_info';
        $http({
          url: $scope.baseurl+url,  
          method: "POST",
          data: {'user_id': id},
        }).then(function mySucces(response) {
            $rootScope.docpopup = response.data;
            //alert($rootScope.docpopup);
            $scope.doc_modal.show();
        });
      }
      $scope.closeDoc_modal = function(){///////////////////////////////sar
        $scope.doc_modal.hide();
      }
      $scope.Doc.date = (searchdate.get()=='')? new Date() :searchdate.get();

      $scope.loading = true; 
      $scope.loadingpart = false;
      
      $rootScope.updateDoc = function(id,fname,lname,speciality,rating,image,address,status){
        $ionicHistory.clearCache();
      $ionicHistory.nextViewOptions({ disableBack: true });
      $window.location.href='#app/doctor';
        $scope.Doc.id = (id=='')? $scope.Doc.id : id;
        var date = $scope.Doc.date ;
        date.setDate( $scope.Doc.date.getDate());
        $scope.Doc.endDate = $scope.Doc.date;
        var date1 = $scope.Doc.endDate ;
        date1.setDate( $scope.Doc.endDate.getDate());
        //console.log($scope.Doc);
        $scope.Doc.fname = fname;
        $scope.Doc.lname = lname;
        $scope.Doc.speciality = speciality;
        $scope.Doc.rating = rating;
        $scope.Doc.image = image;
        $scope.Doc.address = address;
        $scope.Doc.status = status;
        $scope.Doc.resultData ='';/////////////////////////////sar
        //console.log($scope.loading);
        var url='/get_doctor_details';
        //console.log("get data");
        //console.log($scope.Doc);
        $http({
          url: $scope.baseurl+url, 
          method: "POST",
          data: {'docData': $scope.Doc},
        }).then(function mySucces(response) {
          $scope.Doc.resultData = response.data;
          //alert('abc');
          $timeout(function() {
            $scope.loading = false; 
            $scope.loadingpart = true;
          }, 1000);
          date1.setDate( $scope.Doc.endDate.getDate()+4);
          $scope.doc_modal.hide();
          
        });
    }
$scope.selectedDay = (searchdate.get()=='')? new Date() :searchdate.get();
  $scope.selectedDate =($scope.selectedDate=='')?  new Date() : $scope.selectedDate;

$scope.slide= function(myTransition) {
  $rootScope.transitionClass ='test';
    $timeout(function(){
      $rootScope.transitionClass = myTransition;
    },500);
}

})


.controller('BMDCtrl', function($sessionStorage,$ionicModal,$rootScope,$scope, $stateParams,$http,speciality,location,insurance,searchdate,$window,$timeout,$filter,$ionicLoading, $sessionStorage, $ionicHistory) {
  
  $scope.roles = [];
  $scope.loginData = {};
  $scope.signUpData = {};
  $scope.resetData = {};
  $scope.coreurl=coreurl;
  $scope.baseurl=baseurl;
  $scope.my_key=my_key;
  $http.get($scope.baseurl+"/userRole").then((data) =>
  {
    $scope.roles = data.data;
  });
  $scope.submitted= false;
  $scope.loginError =false;
  //alert($sessionStorage.userSessionStatus);
  //$sessionStorage.userSessionStatus = false;
  //$scope.noSessionStatus = true;
  //$scope.doctorlogin = false;
  /*if($sessionStorage.userSessionStatus == false)
  {
    $sessionStorage.userSessionStatus = false;
    $scope.noSessionStatus = true;
  }
  else
  {
    $sessionStorage.userSessionStatus = false;
    $scope.noSessionStatus = true;
  }*/
 


  // Perform the login action when the user submits the login form
  $scope.doDocLogin = function()
  {
    $ionicLoading.show({
      template: '<img  src="img/loading.gif" />'
    });
    //alert("hi");
    var url='/doctorlogin';
    $scope.loginData.device_id = localStorage.token;
    console.log($scope.loginData);
    $http.post($scope.baseurl+url,$scope.loginData).then(function mySucc(response)
    {
      var data = response.data;
      if(data.message == "Successfully Logged in")
      {
        $sessionStorage.userSession = JSON.stringify(response.data.data);
        console.log(response.data.data[0]);
        $scope.userSessionStatus = true;
        $sessionStorage.userSessionStatus = true;
        $scope.noSessionStatus = false;
        $sessionStorage.doctorlogin = true;
        $sessionStorage.doctor_id = response.data.data[0].id;
        $sessionStorage.doctor_email = response.data.data[0].email;
        $sessionStorage.doctor_phone = response.data.data[0].phone;
        //$sessionStorage.doctor_gender = response.data.data[0].doctor_sex;
        $sessionStorage.doctor_login_data = JSON.stringify($scope.loginData);
        $timeout(function() {
          $ionicLoading.hide();
          //$scope.closeDocLogin();
          $scope.doctorlogin = true;
          $window.location.href = "#/app/home";
          $window.location.reload(true);
        }, 1000);
      }
      else
      {
        $timeout(function() {
          $ionicLoading.hide();
          //$scope.closeDocLogin();
        }, 1000);
        $scope.loginError = "failed";
        $scope.loginErrorMsg = "Invalid Credential";
      }
    });
  }
  
  $scope.doLogin = function() {
    $ionicLoading.show({
      template: '<img  src="img/loading.gif" />'
    });
    $scope.loginData.usertype='2';
    $scope.loginData.device_id = localStorage.token;
    var url='/Signin';
    $http({
      url: $scope.baseurl+url, 
      method: "POST",
      data: $scope.loginData,
    }).then(function mySucces(response) {
        $scope.loginDetails = response.data; 
        // $sessionStorage.userSession = response.data;
        // console.log($sessionStorage.SessionMessage);
        if($scope.loginDetails.error.status===false){
          $sessionStorage.patientlogin = true;
          $sessionStorage.userSessionStatus = true;
          $sessionStorage.userSession = response.data;
          $scope.userSession = response.data;
          $scope.userSessionStatus = true;
          $scope.AppointmentDetails.details = true;
          $scope.noSessionStatus = false;
          $timeout(function() {
            $ionicLoading.hide();
            //$scope.closeLogin();
            $window.location.href = "#/app/home";
            $window.location.reload(true);
            //$ionicHistory.clearCache();
            //$ionicHistory.clearHistory();
          }, 1000);
          
        }else{
          $scope.loginError = $scope.loginDetails.error.status;
          $scope.loginErrorMsg = $scope.loginDetails.error.msg;
          $timeout(function() {
            $ionicLoading.hide();
          }, 1000);
        }
    });
  }
    $scope.doSignup = function() {
      $ionicLoading.show({
        template: '<img  src="img/loading.gif" />'
      });
      $scope.signUpData.usertype='2';
      var url='/Signup';
      $http({
        url: $scope.baseurl+url, 
        method: "POST",
        data: $scope.signUpData,
      }).then(function mySucces(response) {
          $scope.signupDetails = response.data; 
          $scope.signupError = $scope.signupDetails.status;
          $scope.signupMessage = $scope.signupDetails.msg;
          $ionicLoading.hide();
          $timeout(function() {            
            //$scope.closeSignup();
            //$scope.login();
            $window.location.href = "#/app/home";
              $window.location.reload(true);
          }, 1000);
      });
    }
    $scope.lat = "";
    $scope.lng = "";
    $scope.location_str = ""
    
      $scope.$on('gmPlacesAutocomplete::placeChanged', function(){
        //console.log($scope.signUpData.location_data.getPlace());
          let place = $scope.signUpData.location_data.getPlace();
          let location = place.geometry.location;
          localStorage.selLat = location.lat();
          localStorage.selLng = location.lng();
          //let location_str = $scope.signUpData.location_data.gm_accessors_.place.gd.formattedPrediction;
          let location_str = place.formatted_address;
          localStorage.selLocation_str = location_str;
          $scope.location_str = location_str;
          $scope.lat = location.lat();
          $scope.lng = location.lng();
          //console.log(location_str);
          $scope.$apply();
    });
    
    $scope.doDocSignup = function()
    {
      //alert("hi");
      $scope.signUpData.location_data = undefined;
      $scope.signUpData.lat = localStorage.selLat;
      $scope.signUpData.lng = localStorage.selLng;
      $scope.signUpData.location_str = localStorage.selLocation_str;
      $ionicLoading.show({
        template: '<img src="img/loading.gif" />'
      });
      $scope.signUpData.location = "1";
      var url='/doctorsignup';
      $http.post($scope.baseurl+url, $scope.signUpData).then(function mySucces(response) {
        if(response.data.message == "Successfully Submitted")
        {
            alert("Registration Successfully");
            $scope.signupDetails = response.data; 
            $scope.signupError = $scope.signupDetails.status;
            $scope.signupMessage = $scope.signupDetails.msg;
            $ionicLoading.hide();
            $timeout(function() {
              $ionicLoading.hide();
              //$scope.closeLogin();
              $window.location.href = "#/app/home";
              $window.location.reload(true);
            }, 1000);
        }
        else
        {
          $ionicLoading.hide();
          $scope.signupError = response.data.message;
          alert("Registration Failed !!! Please check your details");
        }   
      });
    }
  /*$scope.$on('gmPlacesAutocomplete::placeChanged', function () {

    console.log("home location");
    $scope.loc = {};
    console.log($scope.loc);

    if (typeof $scope.desiredLocation != "undefined")
    {
      let place = $scope.desiredLocations.getPlace();
      let location = place.geometry.location;
      localStorage.selLat = location.lat();
      localStorage.selLng = location.lng();
      $scope.location_str = place.formatted_address;
      localStorage.selLocation_str = $scope.location_str;
      console.log(localStorage.selLat);
      $scope.$apply();
    }

    
  });*/

  ////////////////////////////////////////////////////////////

  
  $scope.apnt_init = function(){
	  $scope.select_insurance = '';
	  $scope.select_reason = '';
    //$stateParams.apnt_date_time = $stateParams.apnt_date_time.replace(/([T,a,p])/g, ' $1');
    // var date = new Date($stateParams.apnt_date_time).getTime();
    // var offset = new Date($stateParams.apnt_date_time).getTimezoneOffset();
    // var selectedDate = date - offset;
    // $scope.AppointmentDetails.selectedDate = new Date($stateParams.apnt_date_time).getTime();
    // console.log(new Date(Date.parse($scope.AppointmentDetails.apnt_date_time)).toUTCString());
    $scope.AppointmentDetails.selectedDate = $stateParams.apnt_date_time;
    var url='/get_insurance_list';
    $http({
        url: $scope.baseurl+url, 
        method: "POST",
      }).then(function mySucces(response) {
          $scope.AppointmentDetails.selectionDetails = response.data; 
      });

      var url='/visit_categories';
    $http({
        url: $scope.baseurl+url, 
        method: "POST",
      }).then(function mySucces(response) {
          $scope.AppointmentDetails.visit_categories = response.data;
      });
    }
    
    $scope.slide_apnt= function(myTransition,prev,next) {
      $rootScope.transitionClass ='sample';
        $timeout(function(){
          $rootScope.transitionClass = myTransition;
          $scope.AppointmentDetails.details = (next=="details") ? true : false;
          $scope.AppointmentDetails.confirm = (next=="confirm") ? true : false;
          $scope.AppointmentDetails.success = (next=="success") ? true : false;
        },300);
    }

   //check app_config
    var url='/appkey_validator'; 
    $http({
      url: $scope.baseurl+url, 
      method: "POST",
    data: {'my_key': $scope.my_key},
    }).then(function mySucces(response) {  
      $timeout(function(){
        $ionicLoading.hide();
      },1000);  
      //console.log(response);         
      if(response.data=='true'){ //response.data=='false'
        $window.location.href = '#/app/bmd-blocked';
        //console.log('bmd-blocked');
      }
    });

    $scope.search = function(search_text){
      $window.location.href = '#/app/search_list/'+search_text;
      //console.log(search_text);
      
    }
    $scope.loading = true; 
    $scope.loadingpart = false;
    $scope.searchList = function(){
      var url='/act_search_bar';
      $http({
          url: $scope.baseurl+url, 
          method: "POST",
          data: {'search_text': $stateParams.search_text},
        }).then(function mySucces(response) {
            $scope.searchResponse = response.data;
            //console.log($scope.searchResponse);
            //$window.location.href = '#/app/search_list';
            $timeout(function() {
              $scope.loading = false; 
              $scope.loadingpart = ($scope.searchResponse.location == null && $scope.searchResponse.user == null && $scope.searchResponse.speciality == null && $scope.searchResponse.insurance == null && $scope.searchResponse.languages == null ) ? false : true;
              $scope.noMoreItems = ($scope.searchResponse.location == null && $scope.searchResponse.user == null && $scope.searchResponse.speciality == null && $scope.searchResponse.insurance == null && $scope.searchResponse.languages == null ) ? true : false; 
            }, 1000);
        });
    }
     $scope.view_search_list_doc = function(id){
        $scope.doc_popup_id=id;
        //console.log(id);
        var url='/get_doctor_info';
        $http({
          url: $scope.baseurl+url, 
          method: "POST",
          data: {'user_id': id},
        }).then(function mySucces(response) {
            $rootScope.docpopup = response.data;
            $scope.doc_modal.show();
        });
      }
      
    $scope.test = function(test){
      $scope.srchReason = test;
    }

    $scope.bookAppointment = function(){
      $ionicLoading.show({
        template: '<img  src="img/loading.gif" />'
      });
      $scope.Appointment ={};
      $scope.Appointment.doctor_id = $scope.Doc.id;
      // $scope.Appointment.apnttime = $filter('date')($scope.AppointmentDetails.selectedDate, "EEEE,MMMM dd,yyyy")+" at "+$filter('date')($scope.AppointmentDetails.selectedDate, "hh:mm a");
      $scope.Appointment.apnttime = $scope.AppointmentDetails.selectedDate;
      $scope.Appointment.patiendid = $sessionStorage.userSession.userID;
      $scope.Appointment.apnt_note = $scope.srchReason;
      $scope.Appointment.email = $scope.Doc.doctorId;
      $scope.Appointment.name = $sessionStorage.userSession.name;
      //$scope.reason = $scope.visit_reason;
     // $scope.insurance = $scope.insurance;
      $scope.Appointment.docname = $scope.Doc.fname +" "+$scope.Doc.lname ;
      //console.log($scope.Appointment);
        var url='/act_confirm_apnt';
        $http({
            url: $scope.baseurl+url, 
            method: "POST",
            data: {'Appointment': $scope.Appointment,'reason': $scope.select_reason, 'insurance': 1},//$scope.select_insurance //sar
          }).then(function mySucces(response) {
              $scope.Appointment.response = response.data;
              //$scope.AppointmentDetails.confirm = false;
              //$scope.AppointmentDetails.success=true; 
              $sessionStorage.userSession = JSON.stringify(response.data.Doctor_data);
              if(response.data.status==true){
                $timeout(function() {
                  $ionicLoading.hide();
                  $scope.slide_apnt('slidein-from-right','confirm','success');
                }, 1000);
              }else{
                $timeout(function() {
                  $ionicLoading.hide();
                }, 1000);
              }
          });
    }
  $scope.load_doc_schedule = function()
  {
    var userDet = JSON.parse($sessionStorage.userSession);
    var docDet = userDet[0];
    //console.log(docDet);
    var break_time = JSON.parse(docDet.break_time);
    //console.log("break time");
    //console.log(break_time);
    //console.log(break_time.mon[0]);
    if(break_time != null)
    {
      $scope.docsbrkview = 
      {mon: {start: (break_time.mon[0].start != "")?break_time.mon[0].start:"", end: (break_time.mon[0].end != "")?break_time.mon[0].end:""},
      tue: {start: break_time.tue[0].start, end: break_time.tue[0].end}, 
      wed: {start: break_time.wed[0].start, end: break_time.wed[0].start}, 
      thu: {start: break_time.thu[0].start, end: break_time.thu[0].start}, 
      fri: {start: break_time.fri[0].start, end: break_time.fri[0].start}, 
      sat: {start: break_time.sat[0].start, end: break_time.sat[0].start}, 
      sun: {start: break_time.sun[0].start, end: break_time.sun[0].start}};
    }
    else
    {
      $scope.docsbrkview = 
      {mon: {start: "", end: ""},
      tue: {start: "", end: ""}, 
      wed: {start: "", end: ""}, 
      thu: {start: "", end: ""}, 
      fri: {start: "", end: ""}, 
      sat: {start: "", end: ""}, 
      sun: {start: "", end: ""}};
    }
    
    var vacation_time = JSON.parse(docDet.vacation_time);
    //console.log("vacation time");
    //console.log(vacation_time[0]);
    var working_time = JSON.parse(docDet.working_time);
    //console.log("Working time");
    console.log(working_time);

    $scope.docscheduleview = working_time;
    $scope.docsvacview = vacation_time[0];
    //$scope.docsbrkview = break_time;

    console.log(break_time);
    //$scope.docsvac.vacation = vacation_time[0];
    //console.log($scope.docsvac.vacation);
    //$scope.docsvac.startdate = "01/01/2019";
    //$scope.docsvac = {startdate: "Mon Dec 31 2018 00:00:00 GMT+0530 (IST)"};
    
  }
	$scope.appinsurance = function(item){
		 //console.log(item);
		 $scope.select_insurance = item;
	} 
	$scope.appreason = function(item){
		 //console.log(item);
		 $scope.select_reason= item;
	}
  //console.log($scope.AppointmentDetails);
  $scope.selectionname = $stateParams.selectionId;
  var url='/get_selection_details';
  $scope.loading = true; 
  $scope.loadingpart = false;
  //console.log($scope.loading);
  //console.log($scope.selectionname);
  switch ($scope.selectionname) {
            case 'speciality':
                speciality.set('select any one');
                delete $scope.desiredSearchData.speciality;
                break;
            case 'insurance':
                insurance.set('I ll select my insurance company later.');
                delete $scope.desiredSearchData.insurance;
                break;
            case 'location':
                location.set('select your location');
                delete $scope.desiredSearchData.location;
                break;
            case 'languages':
                location.set('I ll select my insurance company later.');
                delete $scope.desiredSearchData.languages;
                break;
            default:
        }

        if($scope.selectionname == "languages")
        {
          let new_arr = [];

          $http.get($scope.baseurl+"/get_all_language")
          .success(function(response) {
            //console.log(response);
            for(i=0;i<response.length;i++)
            {
              //console.log(response[i]);
              new_arr.push({id: response[i].id, name: response[i].language_name});
            }
            //console.log(new_arr);
            $scope.selectionDetails = new_arr;
            $timeout(function() {
              $scope.loading = false; 
              $scope.loadingpart = true; 
          }, 1000);
           });
        }
        else
        {
           $http.post($scope.baseurl+url, { data: { 'selectionname': $scope.selectionname } })
          .success(function(response) {
            //console.log(response);
            $scope.selectionDetails = response;
            $timeout(function() {
              $scope.loading = false; 
              $scope.loadingpart = true; 
          }, 1000);
           });
        }
  

    $scope.desiredSpeciality = speciality.get();
    $scope.desiredInsurance = insurance.get();
    $scope.desiredLocation = location.get();
    //$scope.desireLanguage = language.get();
    
    
   
    $scope.clickfunction =function(id,data,type,key){
      
      switch (type) {
            case 'speciality':
                speciality.set(data);
                $scope.desiredSearchData.speciality = id;
                break;
            case 'insurance':
                insurance.set(data);
                $scope.desiredSearchData.insurance = id;
                break;
            case 'location':
                location.set(data);
                $scope.desiredSearchData.location = id;
                break;
            case 'languages':
                language.set(data);
                $scope.desiredSearchData.languages = id;
                break;
            default:

        }
        var url=(key==null) ? '#/app/bmd-home' : '#/app/search' ;
      $window.location.href = url;
    }
    

 $ionicModal.fromTemplateUrl('templates/calendar.html', {
    scope: $scope,
    caching: false
  }).then(function(calendar_modal) {
    $scope.calendar_modal = calendar_modal;
  });
  $scope.calendar = function() {
    $scope.loading = true;
    $scope.loadingpart = false;
      var url='/get_calendar_details';
    $http({
      url: $scope.baseurl+url, 
      method: "POST",
    }).then(function mySucces(response) {
      $scope.calenderDetails = response.data;
      
      $timeout(function() {
            $scope.loading = false; 
            $scope.loadingpart = true; 
          }, 1000);
    });

    $scope.calendar_modal.show();
  };

  $scope.calender_fetch = function(month,year){
    $scope.loading = true;
    $scope.loadingpart = false; 
     var url='/get_calendar_details';
    $http({
      url: $scope.baseurl+url, 
      method: "GET",
      params: {'month': month,'year':year},
    }).then(function mySucces(response) {
      $scope.calenderDetails = response.data;
      $timeout(function() {
            $scope.loading = false; 
            $scope.loadingpart = true; 
          }, 1000);
    });
  };

  $scope.selectedDay = (searchdate.get()=='')? new Date() :searchdate.get();
  $scope.selectedDate =($scope.selectedDate=='')?  new Date() : $scope.selectedDate;
  $scope.desiredSearchData.selectedDate =$scope.selectedDate;
  $scope.selectedclass = 'none';
  //$scope.loading = false;
  $scope.loadingpart = false;
  $scope.updateDate = function(day,date){
    $scope.selectedDay = day;
    $scope.selectedDate = date;
    var HHmmss = $filter('date')(new Date(), 'HH:mm:ss');
    var selectedDate = date+"T"+HHmmss;
    $scope.desiredSearchData.selectedDate =new Date(selectedDate);
    searchdate.set($scope.desiredSearchData.selectedDate);
    $scope.selectedclass = ($scope.selectedclass == 'none') ? 'selected' : 'none';
  }

  $scope.closeCalendar = function() {
    $scope.calendar_modal.hide();
  };
  
  $scope.findDoc = function(){
    $window.location.href = '#/app/search';
  };
})
.controller('searchCtrl', function($sessionStorage, $ionicModal,$rootScope,$scope, $stateParams,$http,speciality,location,insurance,searchdate,$window,$timeout,$filter) {
    

    $scope.home_languagess = JSON.parse($sessionStorage.langListMain);
    $scope.home_languagess.splice(0, 0, {id:"",language_name:"All Languages"});

    $scope.home_spelities = JSON.parse($sessionStorage.spListMain);
    $scope.home_spelities.splice(0, 0, { id: "", specialty_name: "All Specialities" });

    $scope.localLocation = (typeof localStorage.selLocation_str == "undefined")?localStorage.formatted_address:localStorage.selLocation_str;
    $scope.lat = "";
    $scope.lng = "";
    $scope.$on('gmPlacesAutocomplete::placeChanged', function(){
      console.log("home");
      console.log($scope.location_data);
      //console.log($scope.signUpData.location_data.getPlace());
        let place = $scope.location_data.getPlace();
        let location = place.geometry.location;
        localStorage.selLat = location.lat();
        localStorage.selLng = location.lng();
        //let location_str = $scope.signUpData.location_data.gm_accessors_.place.gd.formattedPrediction;
        let location_str = place.formatted_address;
        localStorage.selLocation_str = location_str;
        //$scope.location_str = location_str;
        //$scope.lat = location.lat();
        //$scope.lng = location.lng();
        //console.log(location_str);
        $scope.$apply();
  });

    //console.log()

  if ($scope.desiredSearchData.speciality != "")
  {
    for (i = 0; i < $scope.home_spelities.length; i++)
    {
      if ($scope.home_spelities[i].id == $scope.desiredSearchData.speciality)
      {
        console.log($scope.home_spelities[i]);
        $scope.filter_spelity = $scope.home_spelities[i];
      }
    }
  }
  else
  {
    $scope.filter_spelity = $scope.home_spelities[0];
  }
    $scope.filter_language = $scope.home_languagess[0].id;
    //$scope.search_spl = $scope.desiredSearchData.speciality;

    /*$scope.search_gen = "";

    $scope.search_language = "";

    //console.log();

    //$scope.filter_spelity = $scope.search_spl;

    $scope.filter_spelity = "Hematology";*/

    $scope.serach_filter = function(val, type)
    {
      //console.log(val);
      //console.log(type);
      /*
      $scope.desiredSearchData.gender = $scope.search_gen;
      $scope.desiredSearchData.languages = $scope.search_language;
      */
      $scope.desiredSearchData.page = 0;
      if (type == "speciality") $scope.desiredSearchData.speciality = val;

      if (type == "gender") $scope.desiredSearchData.gender = val;

      if (type == "language") $scope.desiredSearchData.languages = val;

      $scope.questions = [];

      $scope.loadmore();

      //console.log($scope.desiredSearchData);


    }
  
    $scope.desiredSearchData.page=0;
    $scope.selectedDay = (searchdate.get()=='')? new Date() :searchdate.get();
    $scope.selectedDate = (searchdate.get()=='')? new Date() :searchdate.get();
    //console.log($scope.selectedDate);
    $scope.questions = [];
    $scope.loadmore = function(NumOfFeedToLoad){
      $scope.noMoreItemsAvailable = false;
      $scope.noMoreItems = false;
      var page = $scope.desiredSearchData.page;
      $scope.desiredSearchData.page=++page;
      //console.log(page);
      $scope.desiredSearchData.selectedDate=$filter('date')($scope.selectedDate, "yyyy-MM-dd hh:mm a");
      $scope.desiredSearchData.lat = (typeof localStorage.selLat != "undefined" && localStorage.selLat != "undefined") ? localStorage.selLat:localStorage.lat;
      $scope.desiredSearchData.lng = (typeof localStorage.selLng != "undefined" && localStorage.selLng != "undefined") ? localStorage.selLng:localStorage.lng;
      $scope.desiredSearchData.location = undefined;
      

      
      //console.log($scope.desiredSearchData.status);
      var url='/get_search_details';
      $http({
        url: $scope.baseurl+url, 
        method: "POST",
        data: {'searchData': $scope.desiredSearchData},
      }).then(function mySucces(response) {
        $scope.searchResultData =response.data;
        if($scope.searchResultData.hasOwnProperty('profile_details'))
        {
          //console.log(response.data.profile_details);

          for(i=0;i<response.data.profile_details.length;i++)
          {
            //console.log(response.data.profile_details[i]);
            //console.log(response.data.profile_details[i].imageName);
            if(response.data.profile_details[i].imageName != null && response.data.profile_details[i].imageName != undefined)
            {
              if(response.data.profile_details[i].imageName.indexOf("assets")>-1)
              {
                response.data.profile_details[i].imageName = $scope.coreurl+"admin/"+response.data.profile_details[i].imageName;
              }
            }
            
            //$scope.questions.push(response.data.profile_details[i]);
          }

          $scope.questions = $scope.questions.concat(response.data.profile_details);
        }
        //console.log($scope.questions.length,response.data.length);
        //$scope.noMoreItemsAvailable = ($scope.questions.length >= response.data.length)? true : false;
        //$scope.noMoreItems = ($scope.questions.length >= response.data.length)? true : false;
        //console.log($scope.questions.length,response.data.length);
        $scope.noMoreItemsAvailable = ($scope.questions.length >= response.data.length)? true : false;
        //console.log('noMoreItemsAvailable'+$scope.noMoreItemsAvailable);
        //console.log(response.data.length==0,$scope.searchResultData.hasOwnProperty('profile_details'));
        $scope.noMoreItems = (response.data.length==0 && $scope.searchResultData.hasOwnProperty('profile_details')) ? true : false;
        //console.log($scope.noMoreItems);
        //console.log($scope.searchResultData.hasOwnProperty('profile_details'));
        $scope.$broadcast('scroll.infiniteScrollComplete');
      });
    };

    $scope.setDate = function(type){
      var date = $scope.selectedDate ;
      date.setDate((type=='next')? $scope.selectedDate.getDate()+1 : $scope.selectedDate.getDate()-1);
      searchdate.set(date);
      $scope.desiredSearchData.status=(type=='next')? 'next' : 'prev';
      $scope.desiredSearchData.selectedDate =$filter('date')(date, "yyyy-MM-dd hh:mm a");
      $scope.desiredSearchData.page=0;
      //angular.element($("[my-directive]")).html('');
      $scope.questions = [];
      $scope.loadmore();
    };
    

        $scope.Doc.date = $scope.selectedDate;
 
    //console.log($scope.Doc);
    //console.log($scope.Doc.resultData);
    $scope.single_calendar = function(status){
      $scope.loading = true; 
      $scope.loadingpart = false;
      //console.log(status);
      $scope.Doc.resultData ='';
      var date = $scope.Doc.date ;
      date.setDate((status=='next')? $scope.Doc.date.getDate()+5 : $scope.Doc.date.getDate()-5 );
      var date1 = $scope.Doc.endDate ;
      date1.setDate((status=='next')? $scope.Doc.endDate.getDate()+5 : $scope.Doc.endDate.getDate()-5 );
      $scope.Doc.status = status;
      var url='/get_doctor_details';
        $http({
          url: $scope.baseurl+url, 
          method: "POST",
          data: {'docData': $scope.Doc},
        }).then(function mySucces(response) {
          $scope.Doc.resultData = response.data;
          //alert('join');
          $timeout(function() {
            $scope.loading = false; 
            $scope.loadingpart = true; 
          }, 3000);
        });
    }

    $scope.apnt_navigate = function(date,time){
       //console.log(date,time);
       //console.log(time);
       time = time.replace("am", "");
       time = time.replace("pm", "");

      var curr_dte= Math.round(new Date().getTime()/1000);
      var event_date = Math.round(new Date(date+" "+time).getTime()/1000);
       
      
      //console.log(event_date);
      //console.log(curr_dte);
      // alert('');
       if(curr_dte > event_date){


          alert('Booking is not Available');
          //return false;
        }
        else{

      $scope.AppointmentDetails.details = true;
      $scope.AppointmentDetails.confirm = false;
      $scope.AppointmentDetails.success = false;
      $window.location.href = '#/app/appointment/'+date+'T'+time;
   }
    }

})
.controller('doctorBookedCtrl', function($sessionStorage, $location,$ionicModal,$rootScope,$scope, $stateParams,$http,speciality,location,insurance,searchdate,$window,$timeout,$filter)
{
  //alert("hi")
  $scope.page_title = "";
  $scope.error = "";
  $scope.appoinment = [];
  $scope.showtb = false;
  $ionicModal.fromTemplateUrl('templates/patient_det.html', {
    scope: $scope,
    caching: false
  }).then(function(patient_det) {
    $scope.patient_det = patient_det;
  });
  $scope.patientDet = function(data)
  {
    //alert(data);
    var url='/getPatientDetails';
    $http({
      url: $scope.baseurl+url, 
      method: "POST",
      data: {'id': data.toString()},
    }).then(function mySucces(response) {
      $scope.Patientdet = response.data.patient_data[0];
      $scope.patient_det.show();
    });
    
  }
  $scope.closePatientdet = function()
  {
    $scope.patient_det.hide();
  }
  var current_state = $location.absUrl().split("#/app/")[1];
  var url='/getBookHist';
  $http({
    url: $scope.baseurl+url, 
    method: "POST",
    data: {id: $sessionStorage.doctor_id},
  }).then(function mySucces(response) {
    var fromdate = response.data.fromtoday;
    var history_data = response.data.history_data;
    if(current_state == "doctor_booked")
    {
      $scope.page_title = "My Appoinment";
      if(fromdate.length > 0)
      {
        $scope.showtb = true;
        $scope.appoinment = fromdate;
      }
      else
      {
        $scope.error = "No more new appoinment";
      }
    }
    if(current_state == "booked_history")
    {
      $scope.page_title = "Appoinment History";
      if(history_data.length > 0)
      {
        $scope.showtb = true;
        $scope.appoinment = history_data;
      }
      else
      {
        $scope.error = "No more history";
      }
    }
  });
});

