---
title: Segurança eleitoral: como garantir a confiança no voto digital
---
A segurança eleitoral determina se um processo de votação pode ser considerado legítimo. Sem ela, os resultados de uma eleição perdem credibilidade, independentemente da tecnologia utilizada ou da quantidade de votos emitidos.

À medida que mais países e organizações incorporam soluções digitais às suas eleições, a segurança eleitoral deixa de ser um tema exclusivamente técnico e passa a ser uma condição de governabilidade.

Este artigo explica o que é a segurança eleitoral, por que a infraestrutura de votação exige proteção específica e como se constrói um sistema de voto digital capaz de sustentar a confiança pública.

## O que é a segurança eleitoral

A segurança eleitoral é o conjunto de medidas técnicas, operacionais e institucionais que protegem a integridade de um processo de votação.

Seu alcance vai da preparação do cadastro eleitoral até a divulgação dos resultados e inclui tanto os sistemas físicos quanto os digitais envolvidos em cada etapa.

Um processo eleitoral seguro garante que apenas os eleitores habilitados possam votar, que cada voto seja registrado e contado exatamente como foi expresso, que o sigilo do voto seja preservado em todos os momentos e que os resultados possam ser verificados e auditados por atores independentes.

Quando alguma dessas condições falha, a legitimidade de toda a eleição fica comprometida. Por isso, a segurança eleitoral não é um componente opcional acrescentado ao final do processo: é a base sobre a qual se constrói a confiança democrática.

## Por que a infraestrutura eleitoral exige proteção específica

A infraestrutura eleitoral tem características que a tornam particularmente sensível.

Diferentemente de outros sistemas tecnológicos, nos quais uma falha pode ser corrigida e o serviço retomado, em uma eleição os erros podem ser irreversíveis e suas consequências afetam diretamente a governabilidade de um país ou de uma instituição.

### Janelas de operação limitadas

Uma eleição ocorre em um período de tempo definido. Se o sistema falhar durante o dia da votação, nem sempre é possível estender prazos ou repetir o processo.

Isso exige níveis de disponibilidade e planos de contingência que vão além do que requer uma aplicação convencional.

### Superfície de ataque ampla

A infraestrutura eleitoral envolve vários componentes que operam simultaneamente: terminais de votação, redes de transmissão, centros de totalização, dispositivos de identificação, plataformas de votação remota.

Cada um desses elementos representa um ponto que deve ser protegido de forma independente e coordenada.

### Impacto na confiança pública

Uma vulnerabilidade em um sistema bancário gera perdas econômicas. Uma vulnerabilidade em um sistema eleitoral gera crises de legitimidade.

A percepção pública é tão importante quanto a realidade técnica: mesmo que um incidente não altere os resultados, o simples fato de ocorrer pode corroer a confiança em todo o processo.

### Diversidade de atores e contextos

Os processos eleitorais envolvem mesários, fiscais de partidos, observadores, eleitores com diferentes níveis de familiaridade tecnológica e marcos legais que variam entre jurisdições.

A segurança deve funcionar em todos esses contextos sem depender de que cada ator tenha conhecimentos técnicos especializados.

Essas características fazem com que a segurança eleitoral exija uma abordagem integral, que combine tecnologia, processos operacionais e validação independente.

## As propriedades de um sistema de votação digital confiável

Além da tecnologia específica utilizada, todo sistema de votação digital deve ser capaz de demonstrar que cumpre um conjunto de propriedades fundamentais. Demonstrar, não apenas afirmar.

### Integridade do voto

O voto emitido pelo eleitor deve ser exatamente o mesmo que é registrado e contado. No caso da Cédula Única Eletrônica (BUE), isso é resolvido com um respaldo duplo: o voto fica impresso em papel e registrado em um chip RFID na própria cédula.

O terminal de votação não armazena nenhum dado. Se houver discrepância entre o papel e o chip, o papel prevalece como fonte de verdade.

### Sigilo e não rastreabilidade

Deve ser impossível vincular um voto à identidade de quem o emitiu. Essa propriedade deve se manter em cada etapa do processo, da emissão até a apuração.

Em plataformas de votação remota como o Invote, a criptografia de ponta a ponta e a separação estrutural entre identidade e voto garantem esse princípio mesmo em ambientes nos quais o eleitor vota a partir do próprio dispositivo.

### Verificabilidade

Um sistema confiável permite dois níveis de verificação. No nível individual, o eleitor pode confirmar que seu voto foi recebido corretamente. No nível universal, qualquer auditor pode comprovar que todos os votos emitidos foram incluídos no resultado final, sem conhecer o conteúdo de cada um.

### Auditabilidade

Terceiros independentes, como partidos políticos, peritos técnicos e órgãos de controle, devem poder revisar e reproduzir os controles aplicados antes, durante e depois da eleição.

Um sistema que não permite auditorias externas dificilmente conseguirá sustentar a confiança pública no longo prazo.

### Disponibilidade e resiliência

O sistema deve funcionar em condições reais de operação, prever contingências e se recuperar de incidentes sem afetar os votos já emitidos. Isso inclui cenários de conectividade limitada, picos de demanda e falhas de hardware.

## As quatro dimensões da segurança eleitoral

O debate público sobre o voto digital tende a se concentrar em uma única pergunta: é possível hackear?

A cibersegurança é fundamental, mas abordar a segurança eleitoral exclusivamente por esse ângulo deixa de fora dimensões igualmente críticas.

### Segurança desde o projeto

A arquitetura do sistema é construída desde o início com uma superfície de ataque mínima.

Nas soluções da COMITIA, isso se traduz em princípios como a inicialização segura, a persistência mínima de dados sensíveis nos dispositivos e o uso de criptografia padrão para proteger cada operação.

### Segurança operacional

Os procedimentos, os papéis definidos, os registros de cada ação e os planos de contingência são tão importantes quanto o código. Um software robusto implantado com processos frágeis continua sendo um sistema vulnerável.

### Segurança verificável

Os controles não podem depender da confiança no fornecedor. Devem existir mecanismos públicos que permitam a fiscais, observadores e auditores confirmar que o sistema opera conforme o esperado.

Essa é a lógica que a COMITIA aplica no Turing, em que os boletins de apuração são digitalizados no local de votação e validados pela autoridade da seção na presença dos fiscais antes da transmissão.

### Segurança institucional

A segurança eleitoral de um fornecedor deve refletir sua forma de operar como organização. Isso implica gestão de riscos documentada, políticas de melhoria contínua e padrões que se sustentem ao longo do tempo, não apenas durante uma eleição pontual.

## A cadeia de confiança na prática

Essas dimensões se materializam em três camadas que devem funcionar de forma integrada.

A primeira é o desenho técnico auditável. Na BUE, o terminal não retém o voto: tudo fica na cédula física.

No Invote, o voto é criptografado no dispositivo do eleitor e só é descriptografado para a contagem final. No Turing, os boletins são transmitidos com protocolos criptografados como o TLS e com autenticação dos operadores. Em todos os casos, o desenho permite que terceiros verifiquem cada passo sem comprometer o sigilo do voto.

A segunda é o processo eleitoral controlado. Cada eleição exige papéis claros entre autoridades, técnicos e fiscalização. Exige controles prévios que incluam testes, simulações e auditorias. Exige monitoramento ativo durante o dia da votação e capacidade de contingência. E exige controles posteriores: recontagens, auditorias cruzadas e revisão de registros.

A terceira é a validação independente. A confiança pública se fortalece quando há terceiros que avaliam o sistema: auditores externos, universidades, órgãos técnicos e entidades certificadoras.

Essas avaliações abrangem a segurança, a privacidade, a qualidade dos processos e o cumprimento de padrões reconhecidos internacionalmente.

## Por que as certificações são o diferencial em segurança eleitoral

No setor de tecnologia eleitoral, muitas organizações afirmam ser seguras e auditáveis. O que faz uma diferença real é o que pode ser demonstrado e sob qual padrão.

As certificações internacionais obrigam a manter processos repetíveis e documentados, gestão de riscos com controles e evidências, auditorias externas periódicas com constatações e ações corretivas, e uma linguagem padronizada que facilita a comunicação com os órgãos eleitorais.

### ISO/IEC 27001: Segurança da Informação

Essa certificação atesta que a organização gerencia a segurança de forma sistemática: políticas, gestão de riscos, controles de acesso, tratamento de incidentes e continuidade operacional. No contexto eleitoral, em que o serviço envolve dados, software, infraestrutura e operação em campo, contar com um marco de gestão integral é um requisito estrutural.

### ISO/IEC 27701: Privacidade

Essa certificação estende o sistema de gestão à privacidade: como os dados pessoais são tratados, quais papéis existem no tratamento, como se aplica a minimização de dados e como são controlados os terceiros envolvidos.

É especialmente relevante em componentes que tratam dados pessoais, como a gestão de cadastros eleitorais por meio de soluções como o Notebox.

A COMITIA possui ambas as certificações vigentes, emitidas pela TÜV Rheinland, abrangendo atividades que vão do projeto e desenvolvimento de software até a implementação, manutenção e suporte de soluções eleitorais.

## Modernizar sem comprometer a legitimidade

O futuro das eleições passa pela tecnologia. Mas a legitimidade democrática exige que essa modernização venha acompanhada de controles verificáveis e padrões reconhecidos.

As plataformas digitais da COMITIA (BUE, Invote, Turing, Notebox) foram projetadas para operar em contextos eleitorais reais, com a complexidade que isso implica.

O que as respalda vai além de sua arquitetura técnica: é um marco de gestão sustentado por certificações internacionais, auditorias externas periódicas e uma forma de operar orientada à melhoria contínua.

Em segurança eleitoral, a diferença entre uma afirmação e uma garantia é a capacidade de demonstrá-la.
