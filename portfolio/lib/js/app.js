const sections = document.querySelectorAll('.section')
const sectBtns = document.querySelectorAll('.controls')
const sectBtn = document.querySelectorAll('.control')
const progBars = document.querySelectorAll('.progress-bar')

const allSections = document.querySelector('.main-content')

function PageTransitions(){
    //Button click active class

      //convert NodeList to array
      let allSectBtns = Array.prototype.slice.call(sectBtn);

    for(let i=0; i< sectBtn.length; i++){        
        sectBtn[i].onclick = function(e){
            const id = e.target.dataset.id
       // for(let a=0; a< sectBtn.length; a++){ 
        allSectBtns.forEach((btn) =>{
            btn.classList.remove("active-btn"); 
        })
        // allSectBtns[a].classList.remove("active-btn"); 
            
        this.classList.add("active-btn");
        
        if(id){
            //remove selected from the other buttons
            sectBtns.forEach((btn) =>{
                btn.classList.remove('active')
            })
            this.classList.add("active")

            //hide other sections
            sections.forEach((section)=>{
                section.classList.remove('active')
            })

            const element = document.getElementById(id)
            element.classList.add("active")

        }
        if(id == "about"){
                progBars.forEach((elem)=>{
                    let percent = elem.dataset.percent
                    elem.querySelector('.prog-text').innerHTML = percent+"%";
                    setTimeout(() => {
                     elem.querySelector('span').style.width = percent+"%";
               
            }, 2000);
         })
        } else {
            progBars.forEach((elem)=>{
                elem.querySelector('.prog-text').innerHTML = "0%";
                elem.querySelector('span').style.width = "0%";
            })
        }
        }
    }

    //sections active class
    // allSectBtns.forEach((section))

    // toggle theme
    const themeBtn = document.querySelector('.theme-btn')
    themeBtn.onclick = ()=>{
        let element = document.body
        element.classList.toggle('light-mode');
    }

}

PageTransitions();

