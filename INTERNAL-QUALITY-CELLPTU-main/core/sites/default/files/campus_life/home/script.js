const ButtonInfo = [
    {name:"1Technical Societies", src:"/sites/default/files/campus_life/home/images_C/tech.jpg", href:"/students/technical-societies" , title:"Technical Society",text: "Welcome to the page of Technical Societies"},
    {name:"1Cultural Clubs",src:"/sites/default/files/campus_life/home/images_C/culture.jpg", href: "/cultural-clubs",title:"Cultural Clubs",text: "Welcome to the page of Cultural Clubs"},
    {name:"1Recent Events", src:"/sites/default/files/campus_life/home/images_C/events.jpg" ,href: "/clubs/recent-events", title:"Recent Events",text: "Welcome to the page of Recent Events"},
    {name:"1Recent Achievements", src:"/sites/default/files/campus_life/home/images_C/acheive.jpg", href:"/clubs/recent-achievements" ,title:"Recent Achievements",text: "Welcome to the page of Recent Achievements"},
    {name:"1Forms",src:"/sites/default/files/campus_life/home/images_C/form.jpg", href:"/forms", title:"Forms",text: "Welcome to the page of Forms"},
    {name:"1Timetable",src:"/sites/default/files/campus_life/home/images_C/timetable.jpg", href:"/current-students/time-tables" ,title:"Time Tables",text: "Welcome to the page of Time Tables"},
    {name:"1Examinations",src:"/sites/default/files/campus_life/home/images_C/exams.jpg", href:"/current-students/examination", title:"Examinations",text: "Welcome to the page of Exams"},
    {name:"1NSS",src:"/sites/default/files/campus_life/home/images_C/NSS.jpg", href:"/", title:"NSS",text: "Welcome to the page of NSS"},
    {name:"1NCC",src:"/sites/default/files/campus_life/home/images_C/NCC.jpg", href:"/ncc", title:"NCC",text: "Welcome to the page of NCC"},
    {name:"1Contact Us", src:"/sites/default/files/campus_life/home/images/contact.jfif", href:"/current-students/contact-us", title:"Contact Us",text: "Welcome to the page of Contact Us"},
    {name:"2Library",src:"/sites/default/files/campus_life/home/images_C/library.jpg", href:"/library", title:"Library",text: "Welcome to the page of Library"},
    {name:"2Computer Centre",src:"/sites/default/files/campus_life/home/images_C/computerCenter.jpg",href:"/computer-centre", title:"Computer Centre",text: "Welcome to the page of Computer Centre"},
    {name:"2Sports",src:"/sites/default/files/campus_life/home/images_C/sports2.jpg",href:"/Sports", title:"Sports",text: "Welcome to the page of Sports"},
    {name:"2Hostels",src:"/sites/default/files/campus_life/home/images_C/hostels.jpg",href:"/hostels", title:"Hostels",text: "Welcome to the page of Hostels"},
    {name:"2Medical Facilities",src:"/sites/default/files/campus_life/home/images_C/medical.jpg", href:"/medical-facilities",title:"Medical Facilities",text: "Welcome to the page of Medical Facilities"},
    {name:"2Workshops",src:"/sites/default/files/campus_life/home/images_C/Workshop2.jpg",href:"/workshops", title:"Workshops",text: "Welcome to the page of Workshops"},
    {name:"2Guest House",src:"/sites/default/files/campus_life/home/images_C/guestHouse.jpg",href:"/", title:"Guest House",text: "Welcome to the page of Guest House"},
    {name:"2Bank",src:"/sites/default/files/campus_life/home/images_C/bank.jpg", href:"/",title:"Bank",text: "Welcome to the page of Bank"},
    {name:"2Post Office",src:"/sites/default/files/campus_life/home/images_C/post.jpg", href:"/", title:"Post Office",text: "Welcome to the page of Post Office"}
]


function check(){
    var buttondiv=document.getElementById("button-cont");
    var buttondiv2=document.getElementById("button-cont2");
    var cardLink = document.getElementsByClassName("card-link");
    var imageContainers=document.getElementsByClassName("card_image");
    var titleContainers=document.getElementsByClassName("card_heading");
    var textContainers=document.getElementsByClassName("card_text");

    var row1=document.getElementById("link-list1");
    var row2=document.getElementById("link-list2");

    ButtonInfo.map(element=>{
        var outerDiv=document.createElement("div");
        outerDiv.classList.add("link-div");
        var li = document.createElement("li");
        var anchor = document.createElement("a");
        anchor.setAttribute("href",element.href);
        anchor.innerHTML=element.name.substr(1);
        anchor.setAttribute("id",element.name);
        li.appendChild(anchor);
        outerDiv.appendChild(li);
        element.name[0] === '1' ? row1.append(outerDiv) : row2.append(outerDiv); 
    })


    ButtonInfo.map(element=>{
            var outerDiv=document.createElement("div");
            outerDiv.classList.add("outer-div");
            var anchor = document.createElement("a");
            anchor.classList.add("button-anchor")
            anchor.setAttribute("href",element.href);
            var button=document.createElement("button");
            button.innerHTML=element.name.substr(1);
            button.classList.add("my-button");
            button.setAttribute("id",element.name);
            button.addEventListener("mouseover",event=>{
                element.name[0]==='1' ? 
                (imageContainers[0].src = element.src, titleContainers[0].innerHTML= element.title, textContainers[0].innerHTML=element.text, cardLink[0].href = element.href) : 
                (imageContainers[1].src = element.src, titleContainers[1].innerHTML= element.title, textContainers[1].innerHTML=element.text, cardLink[1].href = element.href);
            })
            anchor.appendChild(button);
            outerDiv.appendChild(anchor);
            element.name[0] ==='1' ? buttondiv.append(outerDiv) : buttondiv2.append(outerDiv);
    })
}

window.onload=check;