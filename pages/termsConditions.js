import { Button } from "antd";
import MainLayout from "layouts/MainLayout";
import {useRouter} from 'next/router';

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

        El uso de datos personales se limitará a lo previsto en el Aviso de Privacidad disponible en https://www.milformatos.com/aviso-de-privacidad.

        Mil Formatos se reserva el derecho de realizar cualquier tipo de modificación en el Aviso de Privacidad en cualquier momento y sin previo aviso, de acuerdo con sus necesidades o cambios en la legislación aplicable, el usuario acepta dichas modificaciones.

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

