import MainLayout from "layouts/MainLayout";
import {useRouter} from 'next/router';


/*Component with static elements that displays terms and conditions information */
const TermsConditions = () => {
  
    const styles = {
        margin: '3%',
        paddingBottom: '5%',
    }

  const router = useRouter();
  return(
    <MainLayout>
    <div style={styles}>
        <h1 align="center">TERMS AND CONDITIONS</h1>
        <h3 align="center"><i>English</i></h3>

        The present contract describes the terms and conditions applicable to the use of the content, products and/or services of the Break your Brain website. To make use of the content, products and/or services of the website the user shall be subject to the present terms and conditions.

        <h3>I. OBJECT</h3>
        The object is to regulate the access and use of the content, products and/or services available to the general public.

        The owner reserves the right to make any type of modification to the website at any time and without prior notice, the user accepts such modifications.

        Access to the website by the user is free and free of charge, the use of the content, products and/or services implies a subscription cost for the user.

        The administration of the website may be exercised by third parties, i.e. persons other than the owner, without affecting these terms and conditions.

        <h3>II. USER</h3>
        The user's activity on the website as publications or comments will be subject to the present terms and conditions. The user agrees to use the content, products and / or services in a lawful manner, without violating morality or public order, refraining from any act that affects the rights of third parties or the operation of the website.

        The user undertakes to provide truthful information in the website forms.

        Access to the website does not imply a relationship between the user and the owner of the website.

        The user declares to be of legal age and to have the legal capacity to abide by these terms and conditions.

        <h3>III. ACCESS AND BROWSING THE WEBSITE</h3>
        The holder does not guarantee the continuity and availability of content, products and / or services on the website, will perform actions to promote the proper functioning of the website without any responsibility.

        The owner is not responsible for the software being free of errors that may cause damage to the software and/or hardware of the equipment from which the user accesses the website. Similarly, it is not responsible for any damage caused by accessing and/or using the website.

        <h3>IV. PRIVACY POLICY AND DATA PROTECTION</h3>.
        In accordance with the provisions of the Federal Law on Protection of Personal Data Held by Private Parties, the owner undertakes to take the necessary measures to ensure the security of the user, preventing the misuse of personal data provided by the user on the website.

        The owner shall verify that the personal data contained in the databases are correct, true and current, as well as that they are used only for the purpose for which they were collected.

        The use of personal data will be limited to the provisions of the Privacy Notice.

        Break your Brain reserves the right to make any type of modification to the Privacy Notice at any time and without prior notice, according to its needs or changes in the applicable legislation, the user accepts such modifications.

        The website involves the use of cookies which are small amounts of information that are stored in the browser used by the user such as login data, user preferences, date and time the website is accessed, sites visited and IP address, this information is anonymous and will only be used to improve the website. Cookies facilitate navigation and make it more friendly, however, the user can disable them at any time from your browser on the understanding that this may affect some functions of the website.

        <h3>V. LINKS POLICY</h3>.
        On the website may contain links to other internet sites belonging to third parties for which it is not responsible.

        <h3>VI. INTELLECTUAL AND INDUSTRIAL PROPERTY POLICY</h3>
        The owner declares to have the intellectual and industrial property rights of the website including images, audio or video files, logos, trademarks, colors, structures, typographies, designs and other elements that distinguish it, protected by Mexican and international legislation on intellectual and industrial property.

        The user undertakes to respect the industrial and intellectual property rights of the owner and may view the elements of the website, store, copy and print them exclusively for personal use.

        <h3>VII. APPLICABLE LAW AND JURISDICTION</h3>.
        The relationship between the user and the holder shall be governed by the applicable legislation in Spain.

        Break your Brain is not responsible for the improper use of the content, products and/or services of the website and the breach of the present terms and conditions.

        <br/><br/>
        <h1 align="center">TÉRMINOS Y CONDICIONES</h1>
        <h3 align="center"><i>Castellano</i></h3>

        El presente contrato describe los términos y condiciones aplicables al uso del contenido, productos y/o servicios del sitio web Break your Brain. Para hacer uso del contenido, productos y/o servicios del sitio web el usuario deberá sujetarse a los presentes términos y condiciones.

        <h3>I. OBJETO</h3>
        El objeto es regular el acceso y utilización del contenido, productos y/o servicios a disposición del público en general.

        El titular se reserva el derecho de realizar cualquier tipo de modificación en el sitio web en cualquier momento y sin previo aviso, el usuario acepta dichas modificaciones.

        El acceso al sitio web por parte del usuario es libre y gratuito, la utilización del contenido, productos y/o servicios implica un costo de suscripción para el usuario.

        La administración del sitio web puede ejercerse por terceros, es decir, personas distintas al titular, sin afectar esto los presentes términos y condiciones.

        <h3>II. USUARIO</h3>
        La actividad del usuario en el sitio web como publicaciones o comentarios estarán sujetos a los presentes términos y condiciones. El usuario se compromete a utilizar el contenido, productos y/o servicios de forma lícita, sin faltar a la moral o al orden público, absteniéndose de realizar cualquier acto que afecte los derechos de terceros o el funcionamiento del sitio web.

        El usuario se compromete a proporcionar información verídica en los formularios del sitio web.

        El acceso al sitio web no supone una relación entre el usuario y el titular del sitio web.

        El usuario manifiesta ser mayor de edad y contar con la capacidad jurídica de acatar los presentes términos y condiciones.

        <h3>III. ACCESO Y NAVEGACIÓN EN EL SITIO WEB</h3>
        El titular no garantiza la continuidad y disponibilidad del contenido, productos y/o servicios en el sitito web, realizará acciones que fomenten el buen funcionamiento de dicho sitio web sin responsabilidad alguna.

        El titular no se responsabiliza de que el software esté libre de errores que puedan causar un daño al software y/o hardware del equipo del cual el usuario accede al sitio web. De igual forma, no se responsabiliza por los daños causados por el acceso y/o utilización del sitio web.

        <h3>IV. POLÍTICA DE PRIVACIDAD Y PROTECCIÓN DE DATOS</h3>
        Conforme a lo establecido en la Ley Federal de Protección de Datos Personales en Posesión de Particulares, el titular de compromete a tomar las medidas necesarias que garanticen la seguridad del usuario, evitando que se haga uso indebido de los datos personales que el usuario proporcione en el sitio web.

        El titular corroborará que los datos personales contenidos en las bases de datos sean correctos, verídicos y actuales, así como que se utilicen únicamente con el fin con el que fueron recabados.

        El uso de datos personales se limitará a lo previsto la LOPGD en el Aviso de Privacidad .

        Break your Brain se reserva el derecho de realizar cualquier tipo de modificación en el Aviso de Privacidad en cualquier momento y sin previo aviso, de acuerdo con sus necesidades o cambios en la legislación aplicable, el usuario acepta dichas modificaciones.

        El sitio web implica la utilización de cookies que son pequeñas cantidades de información que se almacenan en el navegador utilizado por el usuario como datos de ingreso, preferencias del usuario, fecha y hora en que se accede al sitio web, sitios visitados y dirección IP, esta información es anónima y solo se utilizará para mejorar el sitio web. Los cookies facilitan la navegación y la hacen más amigable, sin embargo, el usuario puede desactivarlos en cualquier momento desde su navegador en el entendido de que esto puede afectar algunas funciones del sitio web.

        <h3>V. POLÍTICA DE ENLACES</h3>
        En el sitio web puede contener enlaces a otros sitios de internet pertenecientes a terceros de los cuales no se hace responsable.

        <h3>VI. POLÍTICA DE PROPIEDAD INTELECTUAL E INDUSTRIAL</h3>
        El titular manifiesta tener los derechos de propiedad intelectual e industrial del sitio web incluyendo imágenes, archivos de audio o video, logotipos, marcas, colores, estructuras, tipografías, diseños y demás elementos que lo distinguen, protegidos por la legislación mexicana e internacional en materia de propiedad intelectual e industrial.

        El usuario se compromete a respetar los derechos de propiedad industrial e intelectual del titular pudiendo visualizar los elementos del sitio web, almacenarlos, copiarlos e imprimirlos exclusivamente para uso personal.

        <h3>VII. LEGISLACIÓN Y JURISDICCIÓN APLICABLE</h3>
        La relación entre el usuario y el titular se regirá por las legislaciones aplicables en España.

        Break your Brain no se responsabiliza por la indebida utilización del contenido, productos y/o servicios del sitio web y del incumplimiento de los presentes términos y condiciones.
        </div>
    </MainLayout>
  );
} 

export default TermsConditions;

