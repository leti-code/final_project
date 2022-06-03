# Guía técnica y de instalación.
En primer, lugar vamos a mostrar el proceso de instalación del código fuente, las dependencias y lo relativo a APIs externas. Finalmente hablaremos brevemente de la estructura del proyecto para facilitar tareas de mantenimiento y de mejora.


## Instalación.

1.	Una vez aquí pulsamos el botón verde “Code” y encontramos diferentes opciones para descargarse el repositorio. 

En este ejemplo vamos a emplear la consola (bash o powershell) para realizar todo el proceso, por lo que únicamente necesitamos copiar el enlace https pulsando el botón de copiar.

2.	Acceder a la consola de comandos y poner el comando ```git clone``` seguido del enlace previamente copiado, al ser un repositorio público no solicitará contraseña:
    ``` git clone https://github.com/leti-code/final_project.git```
 
3.	Accedemos al directorio del proyecto e instalamos las dependencias con el comando ```yarn install```. De este modo, todas las dependencias que aparecen en el package.json son instaladas automáticamente.
    ```yarn install```
 

## Uso de APIs externas.
En este proyecto se realizan llamadas a distintas APIs externas, algunas de las cuales requieren registro y por lo tanto necesitan credenciales también llamadas apikey al realizar la llamada.  Concretamente:

-	MongoDB Atlas: permite alojar en un servidor web nuestra base de datos no relacional. Para poder realizar la conexión es necesaria una url (URI) que incluye en el path las credenciales mencionadas. Además, pueden existir diferentes urls, que darían acceso a distintas bases de datos (en mi caso hay una para desarrollo para poder hacer pruebas y otra en producción para la aplicación ya usable por los usuarios).

-	Cloudinary: es una API que permite guardar imágenes en un servidor web. Con las llamadas a la API podemos subir o descargar imágenes
Para evitar tener que dar mis claves privadas, el proyecto ha sido desplegado en un servidor web, Vercel, que permite acceder al resultado de la app directamente a través del navegador. El enlace para ver el resultado es https://final-project-sandy.vercel.app/
Aun así, por si el objetivo de descargar el repositorio fuera poder desplegarlo en local, he añadido una plantilla de las variables de entorno que requiere el proyecto.
 

Tal y como se explica, lo que habría que hacer es sustituir las definiciones que aparecen a la derecha del = por tus propias claves o urls. Además de las credenciales, también podemos encontrar alguna variable como JWT_SECRET que es el secreto que se le añade a la información que queremos encriptar con la librería jwt.

Una vez todas estas variables de entorno hayan sido adecuadamente completadas, debemos eliminar del título del archivo el “.template” de modo que se llame únicamente “.env” para que al lanzar el programa sea capaz de localizarlo. En caso de no tener las credenciales y requerir para la corrección mis claves privadas, ruego se pongan en contacto conmigo (para evitar al menos que las claves queden reflejadas en el trabajo escrito) y se las proporcionaré de manera privada.

Con todo ello, si queremos desplegar en local y hemos rellenado correctamente todas las variables de entorno, será suficiente con el comando “yarn dev” para que la aplicación empiece a funcionar en local para poder hacer nuestras pruebas y/o mejoras de código
 
Tal y como se ve en la imagen, aparecerá en la línea de comandos en qué puerto se está desplegando nuestra aplicación.
