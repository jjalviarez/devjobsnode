const skills = new Set();
document.addEventListener('DOMContentLoaded', () => {
    
    const skill = document.querySelector(".lista-conocimientos");
    if(skill) {
        
        //Acgrega privos 
        const Activos = document.querySelectorAll(".lista-conocimientos .activo");
        Activos.forEach(activo => skills.add(activo.textContent));
        document.querySelector("#skills").value= JSON.stringify([...skills]);
    
        //Actuaiza agregar alguno nuevo
        skill.addEventListener('click', e => {
            if(e.target.tagName == 'LI') {
                const nombre= e.target.textContent;
                if (e.target.classList.toggle('activo')) {
                    skills.add(nombre)
                } else {
                    skills.delete(nombre)
                }
            }
            document.querySelector("#skills").value= JSON.stringify([...skills]);
        });
    }
    
    
    //Limpiar Alertas
    const alertas = document.querySelector("#alertas");
    if(alertas) {
        /*
        //Quitar todas las apertas a la vez
        setTimeout(() =>{
            alertas.classList.add('fade');
            setTimeout(() =>{
               //
            },2000);
        },3000);
        alertas.parentElement.removeChild(alertas);
        */
        //quitar de una a una
        const intervalo = setInterval(() =>{
            
            if(alertas.children.length > 0) {
                alertas.firstElementChild.classList.add('fade');
                setTimeout(() =>{
                   alertas.removeChild(alertas.firstChild);
                },2000);
            }
            else {
                alertas.parentElement.removeChild(alertas);
                clearInterval(intervalo);
            }
            
        },3000);
        
    }
});
    