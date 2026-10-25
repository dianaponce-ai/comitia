---
title: Votación online: cómo votar por internet de forma segura
cat: invote
---
La votación online permite a los electores emitir su sufragio desde cualquier lugar y dispositivo con conexión a internet, sin necesidad de acudir a un centro de votación físico. Esta modalidad es cada vez más demandada por su capacidad de ampliar la participación y simplificar la logística electoral, pero su adopción depende de una condición innegociable: que el proceso garantice la seguridad, el secreto y la integridad de cada voto emitido.

Este artículo explica qué es la votación online, qué principios de seguridad debe cumplir, cómo funciona un proceso de votación por internet bien diseñado y qué consideraciones deben tener en cuenta los organismos y organizaciones que evalúan implementarla.

## Qué es la votación online

La votación online es una modalidad de sufragio electrónico a distancia en la que el elector accede a una plataforma segura desde su computadora, tablet o teléfono móvil, se autentica, selecciona su opción y emite su voto de forma cifrada.

El proceso se realiza dentro de un período de votación definido por la autoridad electoral, que puede extenderse durante varios días para facilitar la participación.

A diferencia del voto electrónico presencial, donde el ciudadano utiliza una terminal en un centro de votación, la votación online elimina la barrera geográfica. El elector vota desde donde se encuentre, en el momento que le resulte más conveniente dentro del plazo habilitado.

Esta flexibilidad la convierte en una herramienta especialmente relevante para elecciones de diáspora, donde los ciudadanos residentes en el exterior enfrentan barreras logísticas para votar de forma presencial o postal.

También para procesos internos de partidos políticos, sindicatos, colegios profesionales y asociaciones, donde montar una infraestructura presencial completa resulta desproporcionada. Y para consultas populares o referéndums donde se busca maximizar el alcance de la participación ciudadana.

## Principios de seguridad de la votación online

La seguridad en la votación online se construye sobre un conjunto de principios técnicos y operativos que deben cumplirse de forma simultánea. La ausencia de cualquiera de ellos compromete la validez del proceso.

### Autenticación robusta

Solo los votantes habilitados deben poder acceder al sistema y emitir su voto. Esto requiere mecanismos de verificación de identidad que superen el nivel de un simple usuario y contraseña. Los métodos más utilizados incluyen certificados digitales, doble factor de autenticación y sistemas de verificación biométrica, según el nivel de seguridad que exija el proceso.

### Cifrado de extremo a extremo

El contenido del voto debe permanecer secreto desde el momento en que el elector lo emite hasta que se realiza el escrutinio.

El cifrado de extremo a extremo garantiza que el voto se cifra en el dispositivo del elector y se mantiene cifrado durante toda la transmisión y el almacenamiento. Solo se descifra en el momento del conteo, siguiendo protocolos criptográficos auditables.

Ningún intermediario, incluido el proveedor de la plataforma, puede conocer el contenido de un voto individual.

### Integridad

Una vez emitido, el voto no puede ser alterado, modificado ni eliminado. La firma digital de cada sufragio por parte del elector es el mecanismo que asegura que el voto se cuenta exactamente como fue expresado. Cualquier intento de modificación posterior invalida la firma y queda registrado.

### Unicidad

Cada elector solo puede votar una vez. El sistema debe contar con mecanismos para detectar y prevenir votos duplicados sin comprometer el anonimato del sufragio.

La separación entre el registro de participación (quién votó) y el contenido del voto (qué votó) es estructural en los sistemas bien diseñados.

### No trazabilidad

Debe ser imposible vincular el voto emitido con la identidad del elector. En un entorno digital, donde cada acción genera registros, garantizar la no trazabilidad requiere un diseño arquitectónico específico que separe de forma irreversible la identidad del votante de su sufragio. Este principio protege el secreto del voto y previene cualquier forma de coacción o presión sobre el elector.

### Verificabilidad individual y universal

La votación online debe ofrecer dos niveles de verificación. A nivel individual, el elector puede confirmar que su voto fue correctamente recibido por el sistema y que será incluido en el conteo.

A nivel universal, cualquier auditor independiente puede comprobar que la totalidad de los votos emitidos fueron contados en el resultado final, sin poder acceder al contenido de cada voto individual.

Esta doble verificabilidad es lo que permite que un proceso de votación online alcance niveles de confianza comparables a los del voto presencial.

### Auditabilidad

El sistema debe generar registros protegidos criptográficamente de todas las acciones y eventos relevantes del proceso. Estos logs inmutables permiten auditorías técnicas completas antes, durante y después de la elección, y constituyen la evidencia sobre la cual los auditores independientes pueden evaluar la integridad del proceso.

## Cómo funciona un proceso de votación online seguro

Un proceso de votación online bien diseñado sigue una secuencia que combina la experiencia del usuario con controles de seguridad en cada paso.

### Habilitación y comunicación

Antes de la apertura del período de votación, la autoridad electoral define el padrón de electores habilitados, configura la oferta electoral en la plataforma y comunica a los votantes cómo acceder al sistema, qué credenciales necesitan y qué medidas de seguridad deben observar.

La comunicación al elector es parte integral del proceso: incluye instrucciones claras sobre cómo votar y advertencias sobre riesgos como el phishing o la divulgación de credenciales.

### Autenticación del elector

El votante accede a la plataforma y se autentica mediante los mecanismos definidos para el proceso. El sistema verifica que el elector figure en el padrón habilitado y que no haya emitido su voto previamente.

### Emisión del voto

Una vez autenticado, el elector accede a la pantalla de votación, donde visualiza las opciones disponibles y selecciona su preferencia. Antes de confirmar, puede revisar su selección.

Al confirmar, el voto se cifra en su propio dispositivo antes de ser enviado al servidor. Desde ese momento, el contenido del voto es inaccesible para cualquier actor del sistema.

### Confirmación y verificación

Tras emitir su voto, el elector recibe una confirmación de que su sufragio fue correctamente recibido. Dependiendo del sistema, puede recibir además un comprobante criptográfico que le permite verificar posteriormente que su voto fue incluido en el conteo, sin revelar su contenido.

### Escrutinio

Al cierre del período de votación, los votos cifrados se descifran siguiendo protocolos criptográficos que involucran múltiples custodios de claves, generalmente en una ceremonia pública ante observadores y fiscales. Los resultados se consolidan y publican de acuerdo con los procedimientos definidos por la autoridad electoral.

## Consideraciones para organismos que evalúan la votación online

La implementación de votación online requiere un análisis que va más allá de la selección de una plataforma tecnológica.

### Marco legal

La normativa electoral de cada jurisdicción define si la votación a distancia está permitida, bajo qué condiciones y con qué requisitos de fiscalización.

En algunas jurisdicciones puede ser necesario impulsar reformas legales antes de implementar esta modalidad.

### Gobernanza del proceso

El proceso necesita roles claramente definidos: quién administra el sistema, quién supervisa, quién audita y quién tiene acceso a cada componente.

Las ceremonias clave del proceso, como la generación de claves criptográficas y el cierre de la votación, deben realizarse ante fiscales y observadores para mantener la transparencia.

### Pilotos y escalamiento gradual

La experiencia de múltiples jurisdicciones muestra que los procesos de adopción más exitosos comienzan con pilotos controlados en elecciones de menor escala. Esto permite familiarizar a los actores del proceso con la tecnología, ajustar los procedimientos operativos e identificar mejoras antes de escalar a elecciones de mayor alcance.

### Auditoría independiente

Contratar a expertos externos para auditar tanto la plataforma como los procedimientos operativos antes de la elección es una práctica que fortalece la confianza de todos los actores involucrados.

## Invote: la plataforma de votación online de COMITIA

Invote es la solución de votación online de COMITIA, diseñada para cumplir con cada uno de los principios de seguridad descritos en este artículo.

Su arquitectura incorpora cifrado de extremo a extremo, firma digital de cada voto, autenticación robusta del elector, verificabilidad individual y universal, no trazabilidad estructural entre identidad y sufragio, y generación de logs inmutables para auditorías independientes.

Invote fue utilizado en 2025 en la provincia argentina de Tierra del Fuego para la primera elección por internet de la jurisdicción, donde se combinó con la Boleta Única Electrónica (BUE) para el voto presencial en un mismo proceso electoral. Esta experiencia demostró que la votación online puede coexistir con modalidades presenciales dentro de un marco de seguridad y fiscalización consistente.

Invote fue además distinguido en la Conferencia Zero Project, una iniciativa de la Fundación Essl que promueve los derechos de las personas con discapacidad, realizada en las Naciones Unidas en Viena, por su aporte a la accesibilidad electoral. La plataforma permite votar sin asistencia a personas con discapacidad visual, física o con necesidades relacionadas con la alfabetización, preservando en todo momento el secreto y la privacidad del voto. Además de Argentina, Invote ha sido implementado en procesos electorales reales en España, Canadá y los Emiratos Árabes Unidos.

La plataforma opera dentro del marco de certificaciones ISO/IEC 27001 e ISO/IEC 27701 de COMITIA, emitidas por TÜV Rheinland, lo que respalda que los procesos de gestión de seguridad y privacidad cumplen con estándares internacionales verificados de forma periódica e independiente.

La votación online, implementada con los controles adecuados, amplía las posibilidades de participación democrática sin comprometer las garantías que todo proceso electoral exige. La clave está en que la tecnología opere dentro de un marco de seguridad, gobernanza y transparencia que sostenga la legitimidad del resultado.
