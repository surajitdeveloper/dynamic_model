
 App.service('WebService', function( $http, $q,$ionicLoading,$ionicPopup,$timeout){
	/* SIGN UP
	===========================================*/
	 this.upload = function( link,img_el,post_data ){

		// $.mobile.loading('show');
		var url = base_url + link ;
		var result = null;

		var deferred = $q.defer();

		var img = document.getElementById(img_el);
		var imageURI = img.src;

			var options = new FileUploadOptions();
			options.fileKey="file";
			options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
			options.mimeType="image/jpeg";
			// var params = new Object();
			// params.value1 = "test";
			// params.value2 = "param";

			options.params = post_data;
			options.chunkedMode = false;
			var ft = new FileTransfer();

			ft.upload(imageURI, url,
			function(r){
				deferred.resolve(r.response);
			}, function(error){
				alert("An error has occurred: Code::: = " + error.code);


			}, options);

		return deferred.promise;
	  //alert(result);
	 }

	 /* SEND DATA
	  ===============================================*/
	 this.send_data = function( link , post_data,type ){

			var self = this;

			var deferred = $q.defer();
			 var result = null;

				/*  ajax
        --------------------------------------*/
            if( type == 'post'){

                var url = base_url + link;


                 $.ajax({
                  type: "POST",
                  url: url,
                  data: post_data,
                  tryCount : 1,
                  retryLimit : 4,
                  timeout: 20000,
                  success: function(data){
                     // alert(JSON.stringify(data));
                     /*
                      var alertPopup = $ionicPopup.alert({
                        title: 'Don\'t eat that!',
                        template: 'It might taste good'
                      });

                      alertPopup.then(function(res) {
                        console.log('Thank you for not eating my delicious ice cream cone');
                      });
                      */
                    deferred.resolve(data);

                  },
                  error : function(xhr, textStatus, errorThrown ) {
                    //alert(textStatus);
                    console.log(xhr);
                    var MSG;
                    var TITLE;
                    if( textStatus == 'timeout' ){
                      TITLE = "TIME OUT"
                      MSG = "Check your network strength";
                    }else if( xhr.status == 404){ //404
                      TITLE = "SYSTEM ERROR";
                      MSG = "Unable to connect to the server!";
                    }else if( xhr.status == 200 ){
                      TITLE = "SYSTEM ERROR";
                      MSG = "We're sorry, but something went wrong!";
                    }else{
                      TITLE = "SYSTEM ERROR";
                        MSG = "We're sorry, but something went wrong!";
                      // MSG = "Error code : " + xhr.status;
                    }

                    console.log(xhr);
                     $ionicLoading.hide();
                      var ajax_this = this;

                       var confirmPopup = $ionicPopup.confirm({
                          title: TITLE,
                          template: MSG,
                          cssClass: 'ALERT',
                          okText: 'Retry'
                       });

                       confirmPopup.then(function(res) {
                         if(res) {

                           $ionicLoading.show({
                               content: 'Loading',
                               showBackdrop: false
                           });

                           $timeout(function(){
                              $.ajax(ajax_this);
                              return;
                           },100);

                          //  navigator.app.clearCache();
                          //  navigator.app.exitApp();
                         } else {
                           deferred.reject("rejected");
                           console.log('You are not sure');
                         }
                       });


                  },
                  dataType: "json"
                });

            }
			else{

					var url = base_url + link;
					var req = {
						 method: 'POST',
						 url: url,
						 data: post_data
					}


					$http(req).then(
						function (data){
							 //alert(JSON.stringify(data.data));
							deferred.resolve(data.data);
							//hideLoading();
						},function (error){
							$ionicLoading.hide();
							deferred.reject();
						}
					);
			}



		  return deferred.promise;
		 }

	  this.show_loading = function(){

			$ionicLoading.show({
          content: 'Loading',
          showBackdrop: false
      });

	 }

 })
