/* global Swal */
/* global $ */

chrome.runtime.onMessage.addListener(
    function(request, sender,) {
      Swal.fire({
        html:'<div class="fccontainer hidden"> <div> <div class="bg-white rounded-lg p-3" id="fcbox"> <div class="progress mx-auto" data-value="80" id="fcdata"> <span class="progress-left"> <span class="progress-bar"></span> </span> <span class="progress-right"> <span class="progress-bar "></span> </span> <div class="progress-value w-100 h-100 rounded-circle align-items-center d-flex flex-column justify-content-center"> <div class="h2 font-weight-bold" id="fctext" style="margin-bottom: -7px;"></div> <div>Reliability</div> </div> </div> <div id="fcdatashow"  > <div class="text-center mt-4" style="display: flex; flex-direction: row;"> <div class="col-6 border-right"><span class="small text-gray">Media Bias</span> <div class="bias font-weight-bold mt-2" id="fcbias"></div> </div> <div class="col-6"><span class="small text-gray">Objectivity</span> <div class="bias font-weight-bold mt-2" id="fcfact"></div> </div> </div> </div> </div> <div class="bg-white rounded-lg p-4 mt-2" id="summarybox"> <div class="mb-2 h4">Article Summary</div> <div class="summarycontainer"> </div> </div> </div> </div>',
        position: "top-end",
        showConfirmButton:false,
        didOpen: () => {
          Swal.showLoading();
          const b = Swal.getHtmlContainer().querySelector('b');
          const circle = Swal.getHtmlContainer().querySelector('#fcdata');
          const fact =Swal.getHtmlContainer().querySelector('#fcfact');
          const bias =Swal.getHtmlContainer().querySelector('#fcbias');
          const fctext = Swal.getHtmlContainer().querySelector('#fctext');
          const container = Swal.getHtmlContainer().querySelector('.fccontainer')
          const summarycontainer= Swal.getHtmlContainer().querySelector('.summarycontainer')
          const fcdatashow= Swal.getHtmlContainer().querySelector('#fcdatashow')


          fetch('http://localhost:5000/predict', {
					method: 'POST',
					headers: {
						'Accept': 'application/json', 
						'Content-Type': 'application/json' },
					body: JSON.stringify({url: request.link})
				})
        .then(res => res.json())
        .then((res) => {

          container.classList.remove("hidden");

          summarycontainer.textContent=res['summary'].slice(0,400)+"..."

          const value = Math.trunc(res['pred']*100);
          // b.textContent = JSON.stringify(res);
          circle.dataset.value=`${value}`;

          if(res['fact']===0){
            fcdatashow.classList.add('hidden');
          }

          fact.textContent=res['fact'];
            bias.textContent=res['bias'];
         
          fctext.textContent=`${value}%`;

          left=Swal.getHtmlContainer().querySelector('.progress-left .progress-bar');
          right=Swal.getHtmlContainer().querySelector('.progress-right .progress-bar');

          if (value > 0) {
            if (value <= 50) {
              right.style.transform ='rotate(' + value/100*360+ 'deg)'
            } else {
              right.style.transform = 'rotate(180deg)'
              left.style.transform ='rotate(' + (value - 50)/100 *360 + 'deg)'
            }
          }

          if(value<=33){
            left.style.borderColor = "red";
            right.style.borderColor = "red";
          } else if(value<=66){
            left.style.borderColor = "yellow";
            right.style.borderColor = "yellow";            
          }else{
            left.style.borderColor = "green";
            right.style.borderColor = "green";
          }

          
          Swal.hideLoading();

        })
        }
      });
    }
  );

  

