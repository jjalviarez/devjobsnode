module.exports = {
    seleccionarSkills: (seleccionadas = [], opciones) => {
        const skills = [
            'HTML5',
			'CSS3',
			'CSSGrid',
			'Flexbox',
			'JavaScript',
			'jQuery',
			'Node',
			'Angular',
			'VueJS',
			'ReactJS',
			'React Hooks',
			'Redux',
			'Apollo',
			'GraphQL',
			'TypeScript',
			'PHP',
			'Laravel',
			'Symfony',
			'Python',
			'Django',
			'ORM',
			'Sequelize',
			'Mongoose',
			'SQL',
			'MVC',
			'SASS',
			'WordPress'];
		let html= '';
		skills.forEach(skill => {
		    html+= '<li' + (seleccionadas.includes(skill) ? ' class= "activo">' : '>') + skill + '</li>' ;
		});
		return opciones.fn().html = html;
    },
    /*
    //Como lo implemente yo
    tipoContrato: (seleccionada = '', opciones) => {
        const skills = [
			'Freelance',
			'Tiempo Completo',
			'Medio Teimpo',
			'Por Proyecto'];
		let html= seleccionada == '' ? "<option value='' disabled selected>-- Selecciona --</option>" : " <option value='' disabled>-- Selecciona --</option>";
		skills.forEach(skill => {
		    html+= '<option value="' + skill + (seleccionada == skill ? '" selected>' : '">') + skill + '</option>' ;
		});
		console.log(opciones.fn());
		return opciones.fn().html = html;
    }
    */
    //Como se implemento en el curso
    tipoContrato: (seleccionada, opciones) => {
    	
    	//console.log("value='" + seleccionada + "'");
		return opciones.fn(this).replace(new RegExp("value='" + seleccionada + "'"),'$& selected');
		
		/*
		console.log(opciones.fn(this));
		return opciones.fn(this).replace(
            new RegExp(` value="${seleccionada}"`), '$& selected="selected"'
        )
        */
    }
    
};


/*


                <option value='' disabled selected>-- Selecciona --</option>
                <option value='Freelance'>Freelance</option>
                <option value='Tiempo Completo'>Tiempo Completo</option>
                <option value='Medio Teimpo'>Medio Teimpo</option>
                <option value='Por Proyecto'>Por Proyecto</option>
                
                
*/