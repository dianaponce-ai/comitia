---
title: Seguridad electoral: cómo garantizar la confianza en el voto digital
cat: general
---
La seguridad electoral determina si un proceso de votación puede considerarse legítimo. Sin ella, los resultados de una elección carecen de credibilidad, independientemente de la tecnología que se utilice o de la cantidad de votos emitidos.

A medida que más países y organizaciones incorporan soluciones digitales a sus elecciones, la seguridad electoral deja de ser un tema exclusivamente técnico para convertirse en una condición de gobernabilidad.

Este artículo explica qué es la seguridad electoral, por qué la infraestructura de votación requiere protección específica, y cómo se construye un sistema de voto digital que pueda sostener la confianza pública.

## Qué es la seguridad electoral

La seguridad electoral es el conjunto de medidas técnicas, operativas e institucionales que protegen la integridad de un proceso de votación.

Su alcance cubre desde la preparación del padrón hasta la publicación de resultados, e incluye tanto los sistemas físicos como los digitales involucrados en cada etapa.

Un proceso electoral seguro garantiza que solo los votantes habilitados puedan emitir su voto, que cada voto se registre y cuente exactamente como fue expresado, que el secreto del sufragio se preserve en todo momento, y que los resultados puedan ser verificados y auditados por actores independientes.

Cuando alguna de estas condiciones falla, la legitimidad de toda la elección queda comprometida. Por eso la seguridad electoral no es un componente opcional que se agrega al final del proceso: es la base sobre la que se construye la confianza democrática.

## Por qué la infraestructura electoral requiere protección específica

La infraestructura electoral tiene características que la hacen particularmente sensible.

A diferencia de otros sistemas tecnológicos donde una falla puede corregirse y el servicio se reanuda, en una elección los errores pueden ser irreversibles y sus consecuencias afectan directamente la gobernabilidad de un país o una institución.

### Ventanas de operación acotadas

Una elección ocurre en un período de tiempo definido. Si el sistema falla durante la jornada de votación, no siempre es posible extender plazos o repetir el proceso.

Esto exige niveles de disponibilidad y planes de contingencia que van más allá de lo que requiere una aplicación convencional.

### Superficie de ataque amplia

La infraestructura electoral involucra múltiples componentes que operan de forma simultánea: terminales de votación, redes de transmisión, centros de cómputos, dispositivos de acreditación, plataformas de votación remota.

Cada uno de estos elementos representa un punto que debe protegerse de forma independiente y coordinada.

### Impacto en la confianza pública

Una vulnerabilidad en un sistema bancario genera pérdidas económicas. Una vulnerabilidad en un sistema electoral genera crisis de legitimidad.

La percepción pública es tan importante como la realidad técnica: incluso si un incidente no altera los resultados, el solo hecho de que ocurra puede erosionar la confianza en todo el proceso.

### Diversidad de actores y contextos

Los procesos electorales involucran autoridades de mesa, fiscales de partidos, observadores, votantes con distintos niveles de familiaridad tecnológica y marcos legales que varían entre jurisdicciones.

La seguridad debe funcionar en todos estos contextos sin depender de que cada actor tenga conocimientos técnicos especializados.

Estas características hacen que la seguridad electoral requiera un enfoque integral que combine tecnología, procesos operativos y validación independiente.

## Las propiedades de un sistema de votación digital confiable

Más allá de la tecnología específica que se utilice, todo sistema de votación digital debe poder demostrar que cumple con un conjunto de propiedades fundamentales. Demostrar, no solo afirmar.

### Integridad del voto

El voto que emite el elector debe ser exactamente el mismo que se registra y se cuenta. En el caso de la Boleta Única Electrónica (BUE), esto se resuelve con un doble respaldo: el voto queda impreso en papel y registrado en un chip RFID dentro de la misma boleta.

La terminal de votación no almacena ningún dato. Si hay discrepancia entre el papel y el chip, el papel prevalece como fuente de verdad.

### Secreto y no trazabilidad

Debe ser imposible vincular un voto con la identidad de quien lo emitió. Esta propiedad debe sostenerse en cada etapa del proceso, desde la emisión hasta el escrutinio.

En plataformas de votación remota como Invote, el cifrado de extremo a extremo y la separación estructural entre identidad y voto garantizan este principio incluso en entornos donde el votante emite su sufragio desde su propio dispositivo.

### Verificabilidad

Un sistema confiable permite dos niveles de verificación. A nivel individual, el votante puede confirmar que su voto fue correctamente recibido. A nivel universal, cualquier auditor puede comprobar que todos los votos emitidos fueron incluidos en el resultado final, sin conocer el contenido de cada uno.

### Auditabilidad

Terceros independientes como partidos políticos, peritos técnicos y organismos de control deben poder revisar y reproducir los controles aplicados antes, durante y después de la elección.

Un sistema que no permite auditorías externas difícilmente pueda sostener la confianza pública a largo plazo.

### Disponibilidad y resiliencia

El sistema debe funcionar en condiciones reales de operación, contemplar contingencias y recuperarse de incidentes sin afectar los votos ya emitidos. Esto incluye escenarios de conectividad limitada, picos de demanda y fallos de hardware.

## Las cuatro dimensiones de la seguridad electoral

El debate público sobre voto digital tiende a centrarse en una sola pregunta: ¿se puede hackear?

La ciberseguridad es fundamental, pero abordar la seguridad electoral exclusivamente desde esa óptica deja fuera dimensiones que resultan igual de críticas.

### Seguridad por diseño

La arquitectura del sistema se construye desde el inicio con una superficie de ataque mínima.

En las soluciones de COMITIA, esto se traduce en principios como el arranque seguro, la mínima persistencia de datos sensibles en los dispositivos y el uso de criptografía estándar para proteger cada operación.

### Seguridad operativa

Los procedimientos, los roles definidos, los registros de cada acción y los planes de contingencia son tan importantes como el código. Un software robusto desplegado con procesos débiles sigue siendo un sistema vulnerable.

### Seguridad verificable

Los controles no pueden depender de la confianza en el proveedor. Deben existir mecanismos públicos que permitan a fiscales, observadores y auditores confirmar que el sistema opera según lo esperado.

Esta es la lógica que COMITIA aplica en Turing, donde las actas de escrutinio se digitalizan en el recinto de votación y se validan por la autoridad de mesa en presencia de los fiscales antes de su transmisión.

### Seguridad institucional

La seguridad electoral de un proveedor debe reflejar su forma de operar como organización. Eso implica gestión de riesgos documentada, políticas de mejora continua y estándares que se sostengan en el tiempo, no solo durante una elección puntual.

## La cadena de confianza en la práctica

Estas dimensiones se materializan en tres capas que deben funcionar de forma integrada.

La primera es el diseño técnico auditable. En BUE, la terminal no retiene el voto: todo queda en la boleta física.

En Invote, el voto se cifra en el dispositivo del elector y solo se descifra para el conteo final. En Turing, las actas se transmiten con protocolos cifrados como TLS y con autenticación de los operadores. En todos los casos, el diseño permite que terceros verifiquen cada paso sin comprometer el secreto del sufragio.

La segunda es el proceso electoral controlado. Cada elección requiere roles claros entre autoridades, técnicos y fiscalización. Requiere controles previos que incluyan pruebas, simulacros y auditorías. Requiere monitoreo activo durante la jornada y capacidad de contingencia. Y requiere controles posteriores: recuentos, auditorías cruzadas y revisión de registros.

La tercera es la validación independiente. La confianza pública se fortalece cuando existen terceros que evalúan el sistema: auditores externos, universidades, organismos técnicos y entidades certificadoras.

Estas evaluaciones cubren la seguridad, la privacidad, la calidad de los procesos y el cumplimiento de estándares reconocidos internacionalmente.

## Por qué las certificaciones son el diferencial en seguridad electoral

En el sector de tecnología electoral, muchas organizaciones afirman ser seguras y auditables. Lo que marca una diferencia real es qué puede demostrarse y bajo qué estándar.

Las certificaciones internacionales obligan a mantener procesos repetibles y documentados, gestión de riesgos con controles y evidencias, auditorías externas periódicas con hallazgos y acciones correctivas, y un lenguaje estandarizado que facilita la comunicación con organismos electorales.

### ISO/IEC 27001: Seguridad de la Información

Esta certificación acredita que la organización gestiona la seguridad de forma sistemática: políticas, gestión de riesgos, controles de acceso, manejo de incidentes y continuidad operativa. En el contexto electoral, donde el servicio involucra datos, software, infraestructura y operación en terreno, contar con un marco de gestión integral es un requisito estructural.

### ISO/IEC 27701: Privacidad

Esta certificación extiende el sistema de gestión hacia la privacidad: cómo se manejan los datos personales, qué roles existen en el tratamiento, cómo se aplica la minimización de datos y cómo se controlan los terceros involucrados.

Es especialmente relevante en componentes que tratan datos personales, como la gestión de padrones electorales a través de soluciones como Notebox.

COMITIA cuenta con ambas certificaciones vigentes, emitidas por TÜV Rheinland, cubriendo actividades que abarcan desde el diseño y desarrollo de software hasta la implementación, mantenimiento y soporte de soluciones electorales.

## Modernizar sin comprometer la legitimidad

El futuro de las elecciones pasa por la tecnología. Pero la legitimidad democrática exige que esa modernización venga acompañada de controles verificables y estándares reconocidos.

Las plataformas digitales de COMITIA (BUE, Invote, Turing, Notebox) están diseñadas para operar en contextos electorales reales, con la complejidad que eso implica.

Lo que las respalda va más allá de su arquitectura técnica: es un marco de gestión sostenido por certificaciones internacionales, auditorías externas periódicas y una forma de operar orientada a la mejora continua.

En seguridad electoral, la diferencia entre una afirmación y una garantía es la capacidad de demostrarlo.
