let tasks= [];
const savetasks = ()=> {
    localStorage.setItem('task',JSON.stringify(tasks))

} 

const addtask = ()=> {
    const taskinput = document.getElementById("taskinput");
    const text= taskinput.value.trim();

    if (text) {
        tasks.push({text: text, completed: false });
        taskinput.value="";

        updatetasklist();
        updatestats();
        savetasks();
        

    }

};

const toggleTastcomplete = (index) => {
    tasks[index].completed= !tasks[index].completed;
    updatetasklist();
    updatestats();
    savetasks();


};

const deletetask = (index)=>{
    tasks.splice(index,1);
    updatetasklist();
    updatestats();
    savetasks();


}

const edittask = (index) => {
    const taskinput = document.getElementById("taskinput");
    taskinput.value = tasks[index].text;

    tasks.splice(index,1);
    updatetasklist();
    updatestats();
    savetasks();

}

const updatestats = ()=> {
    const completedtasks = tasks.filter((task) => task.completed).length;
    const totaltasks = tasks.length;
    const progress = totaltasks > 0 ? (completedtasks / totaltasks) * 100 : 0;
    const progressBar = document.getElementById("progress");

    progressBar.style.width = `${progress}%`;
    document.getElementById('numbers').innerText = `${completedtasks} / ${totaltasks}`
};


const updatetasklist= ()=> {
    const tasklist= document.getElementById("tasklist");
    tasklist.innerHTML=" ";

    tasks.forEach((task,index)=> {
        const listItem = document.createElement("li");
        


        
        listItem.innerHTML = `
        <div class="taskitem">
            <div class="task ${task.completed ? 'completed' : ""}">
                <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""}  />
                <p>${task.text}</p>
            </div>
            <div class="icons">
                
                <img src="./img/edit.png"onClick="edittask(${index})" />
                <img src="./img/dustbin.png"onClick="deletetask(${index})" />
            </div>
        </div>
        `;

        listItem.addEventListener("change",()=> toggleTastcomplete(index));
        tasklist.append(listItem);
        
     
    });
};



document.getElementById('newtask').addEventListener("click", function(e){
    e.preventDefault()

    addtask();


});
    