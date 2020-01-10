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
});
    