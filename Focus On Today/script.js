const checkBoxList = document.querySelectorAll(".custom-checkbox");
const inputFiledls = document.querySelectorAll(".goal-input");
const errorlabel = document.querySelector(".error-label");
const progressBar = document.querySelector(".progress-bar");
const progressValue = document.querySelector(".progress-value");
const progressLabel = document.querySelector(".progress-label");

const allQuotes = [
    'Raise the bar by completing your goals!',
    'Well begun is haf done!',
    'Just a step away, keep going!',
    'Whoa! You just completed all the goals, time for chill!'
]




const allgoals = JSON.parse(localStorage.getItem('allgoals')) || {
    first:{
    name:"",
    completed:false},
    second:{
        name:"",
        completed:false},
        third:{
            name:"",
            completed:false},
}
let completedGoalsCount = Object.values(allgoals).filter((goal)=>goal.completed).length
progressValue.style.width = `${completedGoalsCount/3*100}%` 
progressValue.firstElementChild.innerText = `${completedGoalsCount}/3 completed`
progressLabel.innerText = allQuotes[completedGoalsCount]

checkBoxList.forEach((checkbox)=>{

checkbox.addEventListener('click',(e)=>{
    const allFiledsFilled = [...inputFiledls].every(function(input){
        return input.value
    })
    if(allFiledsFilled){
        checkbox.parentElement.classList.toggle('completed')
        const inputId = checkbox.nextElementSibling.id
       allgoals[inputId].completed = !allgoals[inputId].completed
       completedGoalsCount = Object.values(allgoals).filter((goal)=>goal.completed).length
       progressValue.style.width = `${completedGoalsCount/3*100}%` 
       progressValue.firstElementChild.innerText = `${completedGoalsCount}/3 completed`
       progressLabel.innerText = allQuotes[completedGoalsCount]
  
       localStorage.setItem('allgoals',JSON.stringify(allgoals))
    }else{
      progressBar.classList.add("show-error")
    }
})

})

inputFiledls.forEach((input)=>{
if(allgoals[input.id].completed){
    input.parentElement.classList.add('completed')
}

   input.value = allgoals[input.id].name
    input.addEventListener('focus',()=>{
        progressBar.classList.remove('show-error')
    })
    input.addEventListener('input',(e)=>{
        if(allgoals[input.id].completed){
       input.value = allgoals[input.id].name
       return
        }
       
       
        allgoals[input.id].name = input.value
        localStorage.setItem('allgoals',JSON.stringify(allgoals))
    })
})

