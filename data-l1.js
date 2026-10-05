/* ===== LEVEL 1 · FIRST STEPS (A1) — contenido propio del Profe, organizado según el temario de Gringo Academy ===== */
const L1RAW = {
1:{tag:'be',
st:`María opens her eyes.|María abre los ojos.
She is in a small white room.|Está en una pequeña habitación blanca.
"Where am I? Am I in a hospital?"|"¿Dónde estoy? ¿Estoy en un hospital?"
"No, you aren't. You're on a spaceship," says a voice.|"No. Estás en una nave espacial", dice una voz.
The voice is a robot. Its name is Beep.|La voz es un robot. Su nombre es Beep.
"I'm María. I'm from Mexico. My family is in Mexico!"|"Soy María. Soy de México. ¡Mi familia está en México!"
"Your mother and your brother are OK. Don't worry."|"Tu mamá y tu hermano están bien. No te preocupes."
"The captain is in the next room. He is ready to meet you."|"El capitán está en la sala de al lado. Está listo para conocerte."`,
q:[["Where is María?","On a spaceship","In a hospital","In Mexico",0],["Who is Beep?","The captain","A robot","Her brother",1],["Where is her family?","On the ship","In Peru","In Mexico",2]],
g:`I am · you / we / they are · he / she / it is — contracciones: I'm, you're, he's, isn't, aren't`,
gx:`I'm the head of treasury.|Soy el jefe de tesorería.
Fernanda is my wife.|Fernanda es mi esposa.
The cats are hungry.|Los gatos tienen hambre.
We aren't late.|No estamos tarde.`,
v:`👩 mother|mamá|My mother is in Colombia.
👨 father|papá|My father is a good man.
👦 brother|hermano|My brother is tall.
👧 sister|hermana|Her sister is a doctor.
💑 wife|esposa|Fernanda is my wife.
🤵 husband|esposo|David is Fernanda's husband.
👴 grandfather|abuelo|My grandfather is eighty.
👵 grandmother|abuela|My grandmother is happy.
👪 parents|padres|My parents are in Medellín.
🧒 cousin|primo / prima|My cousin is from Cali.`,
s:`I am the head of treasury.|Soy el jefe de tesorería.|am
Fernanda is at home today.|Fernanda está en casa hoy.|is
Tom and Paco are my cats.|Tom y Paco son mis gatos.|are
The bank is not open on Sunday.|El banco no está abierto el domingo.|is
We are in a meeting.|Estamos en una reunión.|are
My parents are in Colombia.|Mis padres están en Colombia.|are
She isn't my sister, she's my cousin.|Ella no es mi hermana, es mi prima.|isn't
I'm from Medellín, but I live in Peru.|Soy de Medellín, pero vivo en Perú.|I'm`,
pp:`I am|I'm
you are|you're
he is|he's
is not|isn't`,
sh:`I'm David. I'm from Colombia.
You're on a spaceship.
She isn't my sister.
We're a small team.`,
sp:["Tell me about your family.","Where are you from, and where do you live now?","Who is in your treasury team?"]},

2:{tag:'s3',
st:`The captain opens the door.|El capitán abre la puerta.
He has green skin and three eyes.|Tiene piel verde y tres ojos.
"Hello, María. My name is Mr. Fagorz."|"Hola, María. Mi nombre es el señor Fagorz."
"I teach languages. I speak two hundred languages."|"Enseño idiomas. Hablo doscientos idiomas."
"Our ship travels to my planet every year."|"Nuestra nave viaja a mi planeta cada año."
María asks, "What does your family do?"|María pregunta: "¿Qué hace tu familia?"
"My wife works in a hospital. Our kids study at home."|"Mi esposa trabaja en un hospital. Nuestros hijos estudian en casa."
"And you, María? You need English. Your class starts tomorrow!"|"¿Y tú, María? Necesitas inglés. ¡Tu clase empieza mañana!"`,
q:[["How many eyes does Mr. Fagorz have?","Two","Three","Four",1],["What does Mr. Fagorz do?","He teaches languages","He works in a hospital","He drives the ship",0],["When does María's class start?","Today","Next year","Tomorrow",2]],
g:`I / you / we / they work · he / she / it works — negativo: don't / doesn't + verbo · pregunta: Do / Does ... ?`,
gx:`I check the bank balances every morning.|Reviso los saldos bancarios cada mañana.
Fernanda works from home.|Fernanda trabaja desde casa.
Molly doesn't like water.|A Molly no le gusta el agua.
Does the bank open at nine?|¿El banco abre a las nueve?`,
v:`🙋 my|mi|My office is big.
👉 your|tu / su (de usted)|Is this your laptop?
👨 his|su (de él)|His name is Paco.
👩 her|su (de ella)|Her name is Fernanda.
🐈 its|su (de un animal o cosa)|The cat loves its bed.
👥 our|nuestro|Our team is small.
👪 their|su (de ellos)|Their office is in Lima.
💼 work|trabajar|I work in treasury.
📞 call|llamar|I call the bank every day.
📊 check|revisar|She checks the report.`,
s:`He works in treasury.|Él trabaja en tesorería.|works
The CFO needs the report today.|El gerente financiero necesita el reporte hoy.|needs
Fernanda doesn't work on Sunday.|Fernanda no trabaja los domingos.|doesn't
Does Paco sleep all day?|¿Paco duerme todo el día?|Does
Our bank sends the statement every month.|Nuestro banco envía el extracto cada mes.|sends
My team pays the suppliers on Friday.|Mi equipo paga a los proveedores el viernes.|pays
Her cat eats a lot.|Su gato come mucho.|eats
They don't use cash.|Ellos no usan efectivo.|don't`,
pp:`don't|doesn't
isn't|aren't
he's|his
we're|where`,
sh:`He doesn't work on Sunday.
She's my wife.
They don't use cash.
What's your name?`,
sp:["What do you do every morning at work?","What does Fernanda do on weekends?","What do your cats do all day?"]},

3:{tag:'want',
st:`María sits in a blue classroom.|María se sienta en un salón azul.
Mr. Fagorz writes the alphabet on the board: A, B, C...|El señor Fagorz escribe el alfabeto en el tablero: A, B, C...
"Do you like the color blue, María?"|"¿Te gusta el color azul, María?"
"Yes, I like blue. But I want a red pen."|"Sí, me gusta el azul. Pero quiero un bolígrafo rojo."
"Here you are. Now, count from one to ten."|"Aquí tienes. Ahora, cuenta del uno al diez."
"One, two, three, four, five, six, seven, eight, nine, ten!"|"¡Uno, dos, tres, cuatro, cinco, seis, siete, ocho, nueve, diez!"
"Excellent! You need practice every day."|"¡Excelente! Necesitas práctica todos los días."
"I want to go home, but I like this class."|"Quiero ir a casa, pero me gusta esta clase."`,
q:[["What color is the classroom?","Red","Blue","Green",1],["What does María want?","A red pen","A blue book","A sandwich",0],["What does she need?","A new class","Practice every day","Ten pens",1]],
g:`like / want / need + cosa (I need a pen) · like / want / need + to + verbo (I want to go) — he likes, she wants, it needs`,
gx:`I need a new bank account.|Necesito una nueva cuenta bancaria.
Fernanda likes coffee.|A Fernanda le gusta el café.
Tom wants to eat.|Tom quiere comer.
We don't need cash.|No necesitamos efectivo.`,
v:`🔴 red|rojo|I like red cars.
🔵 blue|azul|The bank logo is blue.
🟢 green|verde|Mr. Fagorz is green.
🟡 yellow|amarillo|The taxi is yellow.
⚫ black|negro|Paco is a black cat.
⚪ white|blanco|Blanca Nieves is a white cat.
🔢 thirteen|trece|I have thirteen emails.
💵 fifty|cincuenta|The fee is fifty dollars.
💯 hundred|cien|One hundred soles.
🏦 thousand|mil|Ten thousand dollars.`,
s:`I need the exchange rate today.|Necesito el tipo de cambio hoy.|need
Fernanda likes to cook on Sunday.|A Fernanda le gusta cocinar el domingo.|likes
Molly wants to sleep.|Molly quiere dormir.|wants
The payment is fifteen thousand dollars.|El pago es de quince mil dólares.|fifteen
Paco is a black cat.|Paco es un gato negro.|black
Does your boss need the report?|¿Tu jefe necesita el reporte?|need
I don't want to work late.|No quiero trabajar tarde.|want
We need three signatures.|Necesitamos tres firmas.|three`,
pp:`thirteen|thirty
fourteen|forty
fifteen|fifty
sixteen|sixty`,
sh:`I need fifteen thousand dollars.
She likes the color green.
I want to go home.
My name is David: D, A, V, I, D.`,
sp:["What do you need at work this week?","What do you like to do on weekends?","Spell your last name, please."]},

4:{tag:'can',
st:`The ship lands in Alienapolis.|La nave aterriza en Alienápolis.
It is Mr. Fagorz's city.|Es la ciudad del señor Fagorz.
The buildings are tall and the streets are purple.|Los edificios son altos y las calles son moradas.
"Can aliens fly here?" María asks.|"¿Los alienígenas pueden volar aquí?", pregunta María.
"Yes, we can fly, but we can't swim."|"Sí, podemos volar, pero no podemos nadar."
María sees a big building. "Whose building is that?"|María ve un edificio grande. "¿De quién es ese edificio?"
"That's the President's house. His name is Gregob."|"Esa es la casa del presidente. Su nombre es Gregob."
"Can I visit it?" "No, you can't. Not today!"|"¿Puedo visitarla?" "No, no puedes. ¡Hoy no!"`,
q:[["Whose city is Alienapolis?","María's","Mr. Fagorz's","The robot's",1],["What can't aliens do?","Fly","Swim","Talk",1],["Who lives in the big building?","President Gregob","Mr. Fagorz","Beep",0]],
g:`Nombre + 's = de quién es (David's office) · can / can't + verbo (I can swim, I can't sing)`,
gx:`Fernanda's car is white.|El carro de Fernanda es blanco.
The company's account is in dollars.|La cuenta de la empresa está en dólares.
I can read English, but I can't speak fast.|Puedo leer inglés, pero no puedo hablar rápido.
Can you send me the report?|¿Puedes enviarme el reporte?`,
v:`🏊 swim|nadar|I can swim.
🚗 drive|manejar|Fernanda can drive.
🍳 cook|cocinar|I can't cook.
💃 dance|bailar|Paisas can dance.
🎤 sing|cantar|I can't sing.
🦅 fly|volar|Aliens can fly.
🗣️ speak|hablar|I can speak Spanish.
📖 read|leer|Can you read this?
✍️ write|escribir|I can write emails.
🏃 run|correr|Tom can run fast.`,
s:`This is my boss's office.|Esta es la oficina de mi jefe.|boss's
Paco's bed is blue.|La cama de Paco es azul.|Paco's
Can you approve the payment?|¿Puedes aprobar el pago?|Can
I can't go to the meeting.|No puedo ir a la reunión.|can't
The bank's app is fast.|La app del banco es rápida.|bank's
She can speak English.|Ella puede hablar inglés.|can
Can I pay with a card?|¿Puedo pagar con tarjeta?|Can
We can't sign today.|No podemos firmar hoy.|can't`,
pp:`cat|cut
bed|bad
sit|set
hot|hut`,
sh:`I can read, but I can't sing.
This is Fernanda's car.
Can you help me?
The cat is on the bed.`,
sp:["What can you do very well?","What can't you do?","Describe your office. Whose desk is next to you?"]},

5:{tag:'wh',
st:`María and Mr. Fagorz go to Mars Mart.|María y el señor Fagorz van a Mars Mart.
"What do you want to buy?" he asks.|"¿Qué quieres comprar?", pregunta él.
"I want a jacket. Do they have jackets here?" "Yes, they do."|"Quiero una chaqueta. ¿Tienen chaquetas aquí?" "Sí."
María tries a red jacket. "Is it big?" "No, it isn't."|María se prueba una chaqueta roja. "¿Es grande?" "No."
"Can I see another jacket?"|"¿Puedo ver otra chaqueta?"
"How much is it?" "It's twenty Mars dollars."|"¿Cuánto cuesta?" "Veinte dólares marcianos."
"Where is the other store?" "It's next to the bank."|"¿Dónde está la otra tienda?" "Está al lado del banco."
María pays and smiles. Shopping on Mars is fun!|María paga y sonríe. ¡Comprar en Marte es divertido!`,
q:[["What does María want?","A jacket","A pen","A ship",0],["How much is the jacket?","Ten Mars dollars","Twenty Mars dollars","Twelve Mars dollars",1],["Where is the other store?","Next to the bank","On the ship","In Mexico",0]],
g:`Respuestas cortas: Yes, I do / No, it isn't · Preguntas WH: What, Where, When, Who, How much`,
gx:`Do you work on Saturday? No, I don't.|¿Trabajas el sábado? No.
Is the bank open? Yes, it is.|¿Está abierto el banco? Sí.
Where is the invoice?|¿Dónde está la factura?
How much is the transfer fee?|¿Cuánto es la comisión de la transferencia?`,
v:`🛒 buy|comprar|I want to buy a jacket.
💵 pay|pagar|I pay with a card.
🧥 jacket|chaqueta|This jacket is cheap.
🏷️ price|precio|What is the price?
💸 expensive|caro|It is too expensive.
🪙 cheap|barato|This is cheap.
🔁 another|otro (uno más)|Can I have another coffee?
↔️ other|otro (el otro, los otros)|The other bank is closed.
🧾 receipt|recibo|Here is your receipt.
💳 card|tarjeta|Can I pay by card?`,
s:`Does the bank open on Saturday? No, it doesn't.|¿El banco abre el sábado? No.|doesn't
Where is the payment report?|¿Dónde está el reporte de pagos?|Where
How much is the dollar today?|¿A cuánto está el dólar hoy?|How much
Can I have another coffee?|¿Me das otro café?|another
The other cats sleep on the sofa.|Los otros gatos duermen en el sofá.|other
Is Fernanda at home? Yes, she is.|¿Fernanda está en casa? Sí.|is
When is the meeting?|¿Cuándo es la reunión?|When
Who signs the checks?|¿Quién firma los cheques?|Who`,
pp:`ship|sheep
full|fool
live|leave
bit|beat`,
sh:`Yes, I do.
No, it isn't.
How much is it?
Can I see another one?`,
sp:["What do you like to buy?","Where do you go shopping in Peru?","Ask me three WH questions about my day."]},

6:{tag:'obj',
st:`Mr. Fagorz takes María to his house.|El señor Fagorz lleva a María a su casa.
"This is my wife, Zola. And these are our kids."|"Esta es mi esposa, Zola. Y estos son nuestros hijos."
Zola hugs her. "Welcome! Come in, please."|Zola la abraza. "¡Bienvenida! Pasa, por favor."
The kids look at María. They like her!|Los niños miran a María. ¡Les cae bien!
"Sit down and eat with us," says Zola.|"Siéntate y come con nosotros", dice Zola.
The food is blue, but María eats it.|La comida es azul, pero María se la come.
"Do you like it?" "Yes, I love it!"|"¿Te gusta?" "¡Sí, me encanta!"
"Don't go to the hotel. Stay with us tonight!"|"No vayas al hotel. ¡Quédate con nosotros esta noche!"`,
q:[["Who is Zola?","Mr. Fagorz's wife","María's sister","A robot",0],["What color is the food?","Green","Red","Blue",2],["Where does María stay tonight?","At a hotel","With the Fagorz family","On the ship",1]],
g:`Pronombres objeto: me, you, him, her, it, us, them · Imperativos: Sit down. / Don't go.`,
gx:`Call me after the meeting.|Llámame después de la reunión.
I send them the report every Monday.|Les envío el reporte cada lunes.
Fernanda loves him.|Fernanda lo ama.
Don't pay the invoice today.|No pagues la factura hoy.`,
v:`🚪 come in|pasa / entra|Come in, please.
🪑 sit down|siéntate|Sit down here.
👂 listen|escucha|Listen to me.
👀 look|mira|Look at this!
✋ wait|espera|Wait a minute.
🔁 repeat|repite|Repeat, please.
📨 send|envía|Send me the file.
🚫 don't touch|no toques|Don't touch it.
📞 call|llama|Call the bank.
✅ check|revisa|Check the balance.`,
s:`Please send me the bank statement.|Por favor, envíame el extracto bancario.|me
I call them every morning.|Los llamo cada mañana.|them
Fernanda helps me with English.|Fernanda me ayuda con el inglés.|me
Don't sign it yet.|No lo firmes todavía.|Don't
Tom loves her.|Tom la ama.|her
Check the balance, please.|Revisa el saldo, por favor.|Check
The manager wants to see us.|El gerente quiere vernos.|us
Give him the invoice.|Dale la factura a él.|him`,
pp:`full|fool
pull|pool
look|Luke
sit|seat`,
sh:`Send me the report, please.
Don't touch it!
Call them tomorrow.
Sit down and eat with us.`,
sp:["Give me three instructions for a new person on your team.","Who helps you at work? How do they help you?","Tell me about a dinner with your family."]},

7:{tag:'past',
st:`The next morning, the Mars Police are at the door.|A la mañana siguiente, la policía de Marte está en la puerta.
"Where were you last night?" they ask María.|"¿Dónde estabas anoche?", le preguntan a María.
"I was here, with the Fagorz family."|"Estaba aquí, con la familia Fagorz."
"The bank of Alienapolis was empty this morning. The money wasn't there."|"El banco de Alienápolis estaba vacío esta mañana. El dinero no estaba."
"It wasn't me! I was asleep!"|"¡No fui yo! ¡Estaba dormida!"
"What was the date of your arrival?" "It was May third."|"¿Cuál fue la fecha de tu llegada?" "El tres de mayo."
Mr. Fagorz says, "She was with us. We were all at home."|El señor Fagorz dice: "Ella estaba con nosotros. Todos estábamos en casa."
The police go, but María is worried.|La policía se va, pero María está preocupada.`,
q:[["Where was María last night?","At the bank","With the Fagorz family","On the ship",1],["What was empty?","The bank","The house","The ship",0],["What was the date of her arrival?","May third","March first","June tenth",0]],
g:`was (I / he / she / it) · were (you / we / they) · wasn't / weren't · Fechas: May 3rd = May third`,
gx:`The payment was on March first.|El pago fue el 1 de marzo.
We were in a meeting all day.|Estuvimos en reunión todo el día.
The cats weren't hungry.|Los gatos no tenían hambre.
Was the bank open yesterday?|¿El banco estaba abierto ayer?`,
v:`🥇 first|primero|January first.
🥈 second|segundo|The second payment.
🥉 third|tercero|May third.
4️⃣ fourth|cuarto|July fourth.
5️⃣ fifth|quinto|The fifth floor.
🎂 eleventh|undécimo (día 11)|My birthday is October eleventh.
🗓️ twentieth|vigésimo (día 20)|The twentieth of May.
📅 date|fecha|What is the date today?
📆 month|mes|This month is busy.
⏮️ yesterday|ayer|Yesterday was Monday.`,
s:`Yesterday was a busy day.|Ayer fue un día ocupado.|was
The auditors were here last week.|Los auditores estuvieron aquí la semana pasada.|were
My birthday is on October eleventh.|Mi cumpleaños es el 11 de octubre.|eleventh
The transfer wasn't on time.|La transferencia no llegó a tiempo.|wasn't
Were you at the bank on Monday?|¿Estuviste en el banco el lunes?|Were
The closing was on the thirtieth.|El cierre fue el treinta.|thirtieth
Paco and Molly were on the sofa.|Paco y Molly estaban en el sofá.|were
Was the meeting long?|¿La reunión fue larga?|Was`,
pp:`buy|boy
now|no
may|my
toy|tie`,
sh:`Where were you last night?
It wasn't me!
My birthday is October eleventh.
We were all at home.`,
sp:["Where were you last weekend?","What was the best day of your month?","When is your birthday? When is Fernanda's?"]},

8:{tag:'dem',
st:`Mr. Fagorz says, "Let's take a tour of the city!"|El señor Fagorz dice: "¡Hagamos un tour por la ciudad!"
"This is the market. These fruits are from Mars."|"Este es el mercado. Estas frutas son de Marte."
"What is that?" María asks. "That is the space station."|"¿Qué es eso?", pregunta María. "Esa es la estación espacial."
"And those lights?" "Those are the ships. They go to Earth."|"¿Y esas luces?" "Esas son las naves. Van a la Tierra."
María thinks about her family. She wants to go home.|María piensa en su familia. Quiere ir a casa.
"Can I take a ship?" "Not now. First, you need to learn."|"¿Puedo tomar una nave?" "Ahora no. Primero necesitas aprender."
They see, they eat, they talk and they walk all day.|Ven, comen, hablan y caminan todo el día.
At night, María says, "I know a lot of new words!"|En la noche, María dice: "¡Sé muchas palabras nuevas!"`,
q:[["Where are these fruits from?","From Earth","From Mars","From Mexico",1],["What are those lights?","Ships","Stars","Cars",0],["What does María want?","To go home","To buy fruit","To sleep",0]],
g:`this (aquí, uno) · these (aquí, varios) · that (allá, uno) · those (allá, varios)`,
gx:`This report is ready.|Este reporte está listo.
These invoices are from May.|Estas facturas son de mayo.
That bank is closed.|Ese banco está cerrado.
Those cats are mine.|Esos gatos son míos.`,
v:`👀 see|ver|I see the problem.
🍽️ eat|comer|We eat at one.
🎁 give|dar|Give me the file.
🏠 live|vivir|I live in Peru.
🧠 know|saber / conocer|I know the answer.
💭 think|pensar / creer|I think it's OK.
🛠️ do|hacer|I do my work.
🤲 have|tener|I have a meeting.
🚶 go|ir|I go to the bank.
💬 say|decir|What does he say?`,
s:`This invoice is from the supplier.|Esta factura es del proveedor.|This
Those reports are on my desk.|Esos reportes están en mi escritorio.|Those
I think the rate is high.|Creo que la tasa está alta.|think
We have a meeting at ten.|Tenemos una reunión a las diez.|have
Give me those papers, please.|Dame esos papeles, por favor.|those
These cats eat a lot.|Estos gatos comen mucho.|These
I know the bank manager.|Conozco al gerente del banco.|know
She goes to the gym on Monday.|Ella va al gimnasio el lunes.|goes`,
pp:`this|these
live|leave
it|eat
still|steal`,
sh:`This is the market.
Those are the ships.
I think I know the answer.
A banana and a sandwich, please.`,
sp:["Describe what you see from your office window.","Use this, these, that and those to describe things on your desk.","What do you do, have and need every Monday?"]},

9:{tag:'there',
st:`At night, María can't sleep.|En la noche, María no puede dormir.
There is a light in Mr. Fagorz's office.|Hay una luz en la oficina del señor Fagorz.
She opens the door. There are maps on the table.|Abre la puerta. Hay mapas sobre la mesa.
There is a photo under the maps. It's a photo of Earth!|Hay una foto debajo de los mapas. ¡Es una foto de la Tierra!
Next to the photo, there is a letter: "Operation María."|Al lado de la foto hay una carta: "Operación María."
Mr. Fagorz is behind her. "María! Go to bed, please."|El señor Fagorz está detrás de ella. "¡María! Vete a la cama, por favor."
"Is there something you want to tell me?" she asks.|"¿Hay algo que me quieras contar?", pregunta ella.
"Tomorrow, at nine. Not now."|"Mañana, a las nueve. Ahora no."`,
q:[["What is on the table?","Maps","Cats","Money",0],["What is under the maps?","A letter","A photo of Earth","A key",1],["When is the talk?","At night","Tomorrow at nine","On Sunday",1]],
g:`There is + uno · There are + varios · in (dentro / meses), on (encima / días), at (punto / horas) · under, next to, behind`,
gx:`There is a meeting at three.|Hay una reunión a las tres.
There are two banks next to my office.|Hay dos bancos al lado de mi oficina.
The cat is under the bed.|El gato está debajo de la cama.
I pay suppliers on Fridays.|Pago a los proveedores los viernes.`,
v:`📦 in|en / dentro de|The money is in the box.
🔝 on|sobre / encima de|The file is on the desk.
⬇️ under|debajo de|The cat is under the table.
↔️ next to|al lado de|The bank is next to the mall.
🔙 behind|detrás de|The car is behind the house.
🔜 in front of|delante de|I am in front of the bank.
🧱 between|entre|My office is between two banks.
⬆️ above|arriba de|The clock is above the door.
📍 at|en (un punto)|I am at the office.
🏧 across from|enfrente de|The ATM is across from the store.`,
s:`There is a problem with the transfer.|Hay un problema con la transferencia.|There is
There are three invoices on my desk.|Hay tres facturas en mi escritorio.|There are
The meeting is at nine.|La reunión es a las nueve.|at
I see my family in December.|Veo a mi familia en diciembre.|in
We close the month on the thirtieth.|Cerramos el mes el treinta.|on
Blanca Nieves is under the bed.|Blanca Nieves está debajo de la cama.|under
Is there a bank near here?|¿Hay un banco cerca de aquí?|Is there
The printer is next to my desk.|La impresora está al lado de mi escritorio.|next to`,
pp:`cat|cut
bed|bad
ship|sheep
pull|pool`,
sh:`There is a light in the office.
There are maps on the table.
The meeting is at nine on Monday.
The photo is under the maps.`,
sp:["What is there in your office?","Where are your cats right now? Use in, on and under.","Describe your street. What is there?"]},

10:{tag:'past',
st:`At nine, Mr. Fagorz talked to María.|A las nueve, el señor Fagorz habló con María.
"An evil alien visited Earth last year. His name is Roshark."|"Un alienígena malvado visitó la Tierra el año pasado. Se llama Roshark."
"He wanted your planet's water."|"Él quería el agua de tu planeta."
"He watched you for months. He followed you."|"Te observó por meses. Te siguió."
"We rescued you from him. That's why you are here."|"Te rescatamos de él. Por eso estás aquí."
María looked at the photo. She cried a little.|María miró la foto. Lloró un poco.
"And the bank? Did Roshark rob the bank?" "Yes, I think so."|"¿Y el banco? ¿Roshark robó el banco?" "Sí, creo que sí."
"Then I want to help you stop him!"|"¡Entonces quiero ayudarte a detenerlo!"`,
q:[["Who is Roshark?","An evil alien","A police officer","María's brother",0],["What did Roshark want?","Money","Water","Ships",1],["What does María want now?","To go home","To help stop Roshark","To sleep",1]],
g:`Pasado regular: verbo + -ed (work → worked, pay → paid) · negativo: didn't + verbo · pregunta: Did you ... ?`,
gx:`I called the bank yesterday.|Llamé al banco ayer.
We paid the suppliers last Friday.|Pagamos a los proveedores el viernes pasado.
Fernanda cooked dinner.|Fernanda cocinó la cena.
I didn't check the email.|No revisé el correo.`,
v:`🏦 bank|banco|The bank is closed.
💲 dollar|dólar|The dollar is high.
📈 interest|interés|The interest rate is five percent.
🧮 balance|saldo|Check the balance.
🧾 invoice|factura|Send the invoice.
📑 contract|contrato|Sign the contract.
🏢 company|empresa|My company is big.
💰 money|dinero|Time is money.
🎯 objective|objetivo|Our objective is clear.
📋 report|reporte / informe|The report is ready.`,
s:`I checked the balance this morning.|Revisé el saldo esta mañana.|checked
We paid the invoice yesterday.|Pagamos la factura ayer.|paid
The bank called me last week.|El banco me llamó la semana pasada.|called
I didn't sign the contract.|No firmé el contrato.|didn't
Did you send the report?|¿Enviaste el reporte?|Did
Fernanda watched a movie last night.|Fernanda vio una película anoche.|watched
The dollar closed at three seventy.|El dólar cerró en tres setenta.|closed
We worked late on Monday.|Trabajamos tarde el lunes.|worked`,
pp:`worked|work
played|play
wanted|want
looked|look`,
sh:`I worked late yesterday.
She wanted water.
We rescued you.
Did you check the balance?`,
sp:["What did you do yesterday at work?","What did you and Fernanda do last weekend?","Tell me about a problem you solved last month."]},

11:{tag:'past',
st:`María went to the space station with Mr. Fagorz.|María fue a la estación espacial con el señor Fagorz.
She saw Roshark's ship there.|Vio la nave de Roshark allí.
She took a photo and sent it to the police.|Tomó una foto y se la envió a la policía.
The police came fast. They caught Roshark's robots.|La policía llegó rápido. Atraparon a los robots de Roshark.
But Roshark ran away.|Pero Roshark escapó.
People in Alienapolis said, "María is a hero!"|La gente de Alienápolis dijo: "¡María es una heroína!"
María felt happy, but she knew the story was not over.|María se sintió feliz, pero sabía que la historia no había terminado.
That night, she had a big dinner with the Fagorz family.|Esa noche tuvo una gran cena con la familia Fagorz.`,
q:[["What did María see at the station?","Roshark's ship","Her family","A bank",0],["Who did the police catch?","Roshark","Roshark's robots","Mr. Fagorz",1],["What did people say?","María is a hero","María is a robot","María is evil",0]],
g:`Pasado irregular: go → went, see → saw, take → took, come → came, have → had, say → said, know → knew, feel → felt`,
gx:`I went to the bank on Monday.|Fui al banco el lunes.
We had a meeting with the auditors.|Tuvimos una reunión con los auditores.
Fernanda took the car.|Fernanda se llevó el carro.
I didn't see the email.|No vi el correo.`,
v:`⏰ wake up|despertarse|I wake up at six.
🛏️ get up|levantarse|I get up at six fifteen.
🚿 take a shower|ducharse|I take a shower.
☕ have breakfast|desayunar|I have breakfast with Fernanda.
🚗 drive to work|manejar al trabajo|I drive to work.
📧 check emails|revisar correos|I check emails first.
🍲 have lunch|almorzar|I have lunch at one.
🏡 get home|llegar a casa|I get home at seven.
🐈 feed the cats|alimentar a los gatos|I feed the cats.
😴 go to bed|acostarse|I go to bed at eleven.`,
s:`I went to the office early.|Fui a la oficina temprano.|went
We had a long meeting.|Tuvimos una reunión larga.|had
I saw the transfer this morning.|Vi la transferencia esta mañana.|saw
The CFO said yes.|El gerente financiero dijo que sí.|said
I got up at six.|Me levanté a las seis.|got
Fernanda made coffee.|Fernanda hizo café.|made
I didn't go to the gym.|No fui al gimnasio.|go
Paco came to the kitchen.|Paco vino a la cocina.|came`,
pp:`went|want
saw|so
made|mad
came|come`,
sh:`I went to the bank.
She saw the ship.
They came fast.
I get up at six and feed the cats.`,
sp:["Tell me your daily routine.","What did you do yesterday morning?","Did anything special happen this week?"]},

12:{tag:'art',
st:`After the dinner, María had a pain in her stomach.|Después de la cena, a María le dolió el estómago.
Zola took her to the hospital.|Zola la llevó al hospital.
A doctor with four arms came in.|Entró un doctor con cuatro brazos.
"Open your mouth, please. Now show me your hands."|"Abre la boca, por favor. Ahora muéstrame las manos."
"The problem is the blue food. Humans can't eat it!"|"El problema es la comida azul. ¡Los humanos no pueden comerla!"
The doctor gave her an orange pill.|El doctor le dio una pastilla naranja.
"Drink a glass of water and rest."|"Tómate un vaso de agua y descansa."
María felt better in an hour.|María se sintió mejor en una hora.`,
q:[["What hurt?","Her head","Her stomach","Her leg",1],["How many arms does the doctor have?","Two","Three","Four",2],["What was the problem?","The blue food","The water","The robot",0]],
g:`a + sonido consonante (a bank) · an + sonido vocal (an invoice, an hour) · the = algo específico (the bank next to my office)`,
gx:`I need an account in dollars.|Necesito una cuenta en dólares.
The account is ready.|La cuenta está lista.
She is a doctor.|Ella es doctora.
It takes an hour.|Toma una hora.`,
v:`🗣️ head|cabeza|My head hurts.
👁️ eye|ojo|Mr. Fagorz has three eyes.
👂 ear|oreja / oído|My ear hurts.
👃 nose|nariz|The cat has a pink nose.
👄 mouth|boca|Open your mouth.
✋ hand|mano|Show me your hands.
💪 arm|brazo|He has four arms.
🦵 leg|pierna|My leg hurts.
🦶 foot|pie|My foot is cold.
🤢 stomach|estómago|I have a stomachache.`,
s:`I have an appointment at the bank.|Tengo una cita en el banco.|an
The bank is next to the hospital.|El banco está al lado del hospital.|The
It's an urgent payment.|Es un pago urgente.|an
I need a new laptop.|Necesito un portátil nuevo.|a
My head hurts after the closing.|Me duele la cabeza después del cierre.|head
The report is on the table.|El reporte está en la mesa.|The
She is an auditor.|Ella es auditora.|an
Paco hurt his leg.|Paco se lastimó la pata.|leg`,
pp:`sin|sing
thin|thing
ran|rang
kin|king`,
sh:`I have a pain in my stomach.
Open your mouth, please.
An hour and a half.
The king can sing.`,
sp:["When was your last visit to a doctor? What happened?","How do you feel after a long day at work?","Describe one of your cats using body parts."]},

13:{tag:'wh',
st:`María and Mr. Fagorz went to President Gregob's palace.|María y el señor Fagorz fueron al palacio del presidente Gregob.
Gregob was very tall and very old.|Gregob era muy alto y muy viejo.
"Who are you? Why are you here?" he asked.|"¿Quiénes son? ¿Por qué están aquí?", preguntó.
"I'm María. I'm from Earth. I want to stop Roshark."|"Soy María. Soy de la Tierra. Quiero detener a Roshark."
"How can a small human stop him?"|"¿Cómo puede una humana tan pequeña detenerlo?"
"I'm small, but I'm smart and brave."|"Soy pequeña, pero soy inteligente y valiente."
Gregob laughed. "Yes, you are. When can you start?"|Gregob se rió. "Sí, lo eres. ¿Cuándo puedes empezar?"
"Tomorrow!" said María. Her new job was dangerous but exciting.|"¡Mañana!", dijo María. Su nuevo trabajo era peligroso pero emocionante.`,
q:[["What was Gregob like?","Short and young","Tall and old","Small and smart",1],["What does María want?","To stop Roshark","A new house","Money",0],["When can she start?","Today","Tomorrow","Next year",1]],
g:`Who (persona) · What (cosa) · Where (lugar) · When (tiempo) · Why (razón) · How (modo) · Which (cuál, entre opciones)`,
gx:`Why is the dollar so high?|¿Por qué está tan alto el dólar?
Which bank has the best rate?|¿Qué banco tiene la mejor tasa?
How do you pay the suppliers?|¿Cómo les pagas a los proveedores?
Who approved this payment?|¿Quién aprobó este pago?`,
v:`📏 tall|alto|Gregob is tall.
🤏 short|bajo|My cousin is short.
🧓 old|viejo|The building is old.
👶 young|joven|Our analyst is young.
🧠 smart|inteligente|María is smart.
🦁 brave|valiente|She is brave.
😴 tired|cansado|I'm tired today.
😊 friendly|amable|The banker is friendly.
⚠️ dangerous|peligroso|The job is dangerous.
🤩 exciting|emocionante|Treasury is exciting!`,
s:`Why is the payment late?|¿Por qué está atrasado el pago?|Why
Which account do you want?|¿Qué cuenta quieres?|Which
How do you go to work?|¿Cómo vas al trabajo?|How
Who is your bank officer?|¿Quién es tu ejecutivo del banco?|Who
I'm tired, but happy.|Estoy cansado, pero feliz.|tired
Our team is small but smart.|Nuestro equipo es pequeño pero inteligente.|smart
Where do you keep the checks?|¿Dónde guardas los cheques?|Where
When is the closing?|¿Cuándo es el cierre?|When`,
pp:`yellow|jello
yolk|joke
yam|jam
yes|Jess`,
sh:`Why are you here?
Yes, I'm young and brave.
Which bank has the best rate?
Yellow jam and orange juice.`,
sp:["What are three adjectives that describe you?","Ask me three WH questions about my job.","Describe your boss or a colleague."]},

14:{tag:'would',
st:`Mr. Fagorz's nephew, Tiko, invited María to dinner.|Tiko, el sobrino del señor Fagorz, invitó a María a cenar.
The restaurant was at the top of a tower.|El restaurante estaba en lo alto de una torre.
"Good evening. Would you like a table for two?"|"Buenas noches. ¿Desean una mesa para dos?"
"Yes, please. Can we see the menu?"|"Sí, por favor. ¿Podemos ver la carta?"
"I'd like the soup and a glass of water. No blue food, please!"|"Quisiera la sopa y un vaso de agua. ¡Nada de comida azul, por favor!"
Tiko ordered red rice. "Would you like some?" "No, thanks."|Tiko pidió arroz rojo. "¿Quieres un poco?" "No, gracias."
They talked and laughed a lot.|Hablaron y se rieron mucho.
"Could we have the check, please?" Tiko paid.|"¿Nos trae la cuenta, por favor?" Tiko pagó.`,
q:[["Who invited María?","Tiko","Gregob","Beep",0],["What did María order?","Red rice","Soup and water","Blue food",1],["Who paid?","María","Tiko","Mr. Fagorz",1]],
g:`Would you like ... ? (¿Quisieras / te gustaría ... ?) · I'd like = I would like (quisiera), más cortés que I want`,
gx:`I'd like to open an account.|Quisiera abrir una cuenta.
Would you like a coffee?|¿Quisieras un café?
We'd like a better rate.|Quisiéramos una mejor tasa.
Would you like to see the report?|¿Te gustaría ver el reporte?`,
v:`📜 menu|carta / menú|Can I see the menu?
🧑‍🍳 waiter|mesero|The waiter is friendly.
🍽️ order|pedir|I'd like to order.
🥤 drink|bebida|What would you like to drink?
🥗 starter|entrada|A salad as a starter.
🥩 main course|plato fuerte|Fish for the main course.
🍰 dessert|postre|No dessert, thanks.
🧾 check|cuenta (en restaurante)|The check, please.
💁 tip|propina|We left a tip.
🪑 table for two|mesa para dos|A table for two, please.`,
s:`I'd like to open a dollar account.|Quisiera abrir una cuenta en dólares.|I'd like
Would you like a coffee?|¿Quisieras un café?|Would
We'd like a better exchange rate.|Quisiéramos un mejor tipo de cambio.|We'd like
Could we have the check, please?|¿Nos trae la cuenta, por favor?|check
Fernanda would like a table for two.|Fernanda quisiera una mesa para dos.|would like
What would you like to drink?|¿Qué te gustaría tomar?|would
I'd like the fish, please.|Quisiera el pescado, por favor.|I'd like
Would you like to see the report?|¿Te gustaría ver el reporte?|Would`,
pp:`right|light
read|lead
rice|lice
row|low`,
sh:`I'd like the soup, please.
Would you like a table for two?
Red rice, right?
Could we have the check, please?`,
sp:["Order dinner for you and Fernanda. I'm the waiter.","What would you like to do on your next vacation?","What is your favorite restaurant in Peru?"]},

15:{tag:'will',
st:`Back at the palace, Gregob explained the plan.|De vuelta en el palacio, Gregob explicó el plan.
"Tomorrow, Roshark will come to the city. He will try to take our water."|"Mañana Roshark vendrá a la ciudad. Tratará de llevarse nuestra agua."
"María will wait near the tower. Tiko will drive the car."|"María esperará cerca de la torre. Tiko manejará el carro."
"Mr. Fagorz and the police will be behind the bank."|"El señor Fagorz y la policía estarán detrás del banco."
"What will I do if he sees me?" María asked.|"¿Qué haré si me ve?", preguntó María.
"Don't worry. We will be there. You won't be alone."|"No te preocupes. Estaremos allí. No estarás sola."
María thought, "This will be the most important day of my life."|María pensó: "Este será el día más importante de mi vida."
That night, she didn't sleep.|Esa noche no durmió.`,
q:[["When will Roshark come?","Today","Tomorrow","Next month",1],["Who will drive the car?","María","Tiko","Gregob",1],["Where will the police be?","Behind the bank","On the ship","In the tower",0]],
g:`will + verbo (futuro, decisiones, promesas) · won't = will not · I'll, you'll, we'll`,
gx:`I'll send the report tomorrow.|Enviaré el reporte mañana.
The dollar will go up.|El dólar subirá.
We won't pay today.|No pagaremos hoy.
Will you call the bank?|¿Llamarás al banco?`,
v:`⬆️ up|arriba|Prices go up.
⬇️ down|abajo|The rate went down.
↪️ into|hacia dentro de|Go into the bank.
↩️ out of|fuera de|Get out of the car.
➡️ to|a / hacia|I go to work.
⬅️ from|de / desde|I'm from Colombia.
🌉 across|al otro lado de|Walk across the street.
🔄 around|alrededor de|Around the city.
🚇 through|a través de|Go through the door.
📍 near|cerca de|Near the tower.`,
s:`I'll call the bank tomorrow.|Llamaré al banco mañana.|I'll
The dollar will go up next week.|El dólar subirá la próxima semana.|will
We won't pay the invoice today.|No pagaremos la factura hoy.|won't
Will you send me the file?|¿Me enviarás el archivo?|Will
Fernanda will cook tonight.|Fernanda cocinará esta noche.|will
I'll be there at nine.|Estaré allí a las nueve.|I'll
The bank is near the office.|El banco está cerca de la oficina.|near
I think it will rain.|Creo que va a llover.|will`,
pp:`think|sink
three|tree
thin|tin
they|day`,
sh:`I think I'll be there.
Three thousand three hundred.
They will come tomorrow.
Thank you, I'll think about it.`,
sp:["What will you do this weekend?","Where will you be in five years?","Make three predictions about the dollar or the market."]},

16:{tag:'past',
st:`The next day, María found Roshark's house in the mountains.|Al día siguiente, María encontró la casa de Roshark en las montañas.
She went up the hill and through the trees.|Subió la colina y pasó entre los árboles.
She got into the house through a window.|Entró a la casa por una ventana.
Inside, she found a big machine and many bottles of water.|Adentro encontró una máquina grande y muchas botellas de agua.
She heard steps. Someone came down the stairs.|Escuchó pasos. Alguien bajó por las escaleras.
María hid under a table.|María se escondió debajo de una mesa.
It was Roshark! He spoke on the phone: "Tomorrow, the water is mine."|¡Era Roshark! Habló por teléfono: "Mañana el agua es mía."
María left the house quietly and ran to the city.|María salió de la casa en silencio y corrió a la ciudad.`,
q:[["Where was Roshark's house?","In the mountains","Next to the bank","On the ship",0],["How did María get in?","Through the door","Through a window","Through the roof",1],["Where did María hide?","Under a table","Behind the door","In the machine",0]],
g:`find → found, get → got, hear → heard, hide → hid, speak → spoke, leave → left, run → ran, buy → bought`,
gx:`I found the error in the report.|Encontré el error en el reporte.
We spoke with the bank.|Hablamos con el banco.
I left the office at seven.|Salí de la oficina a las siete.
She bought a new phone.|Ella compró un teléfono nuevo.`,
v:`⬆️ go up|subir|Go up the stairs.
⬇️ go down|bajar|Go down the street.
🚕 get into|entrar a / subirse a|Get into the car.
🏃 get out of|salir de / bajarse de|Get out of the taxi.
🌳 through|a través de|Walk through the park.
🌉 over|por encima de|Drive over the bridge.
🏞️ along|a lo largo de|Walk along the river.
↪️ past|pasando por|Go past the bank.
🔄 around|alrededor de|Walk around the building.
🧭 towards|hacia|Walk towards the station.`,
s:`I found the mistake in the bank statement.|Encontré el error en el extracto.|found
We spoke with the auditors yesterday.|Hablamos con los auditores ayer.|spoke
I left the office late.|Salí tarde de la oficina.|left
Fernanda bought a new sofa.|Fernanda compró un sofá nuevo.|bought
Molly ran under the bed.|Molly corrió debajo de la cama.|ran
I heard the news on the radio.|Escuché la noticia en la radio.|heard
Go past the bank and turn left.|Pasa el banco y gira a la izquierda.|past
I got out of the taxi.|Me bajé del taxi.|out of`,
pp:`ship|chip
shoes|choose
wash|watch
sheep|cheap`,
sh:`She found a machine.
I heard steps on the stairs.
Cheap shoes, please.
She watched the ship.`,
sp:["Tell me about a time you found a big mistake.","Describe the way from your house to your office.","What did you buy last month?"]},

17:{tag:'prep',
st:`María told Gregob everything.|María le contó todo a Gregob.
"Roshark sells water to other planets," she said.|"Roshark les vende agua a otros planetas", dijo.
"He began his business in 2020. He made a lot of money."|"Empezó su negocio en 2020. Ganó mucho dinero."
"He keeps the money in a secret bank, on Saturn."|"Guarda el dinero en un banco secreto, en Saturno."
Gregob thought for a long time.|Gregob pensó por mucho tiempo.
"We can't wait until Friday. We will act on Wednesday, at midnight."|"No podemos esperar hasta el viernes. Actuaremos el miércoles, a medianoche."
The police chose ten officers for the mission.|La policía eligió a diez oficiales para la misión.
María couldn't sleep that night.|María no pudo dormir esa noche.`,
q:[["What does Roshark sell?","Ships","Water","Food",1],["Where is the money?","On Mars","On Saturn","In Alienapolis",1],["When will they act?","On Friday","On Wednesday at midnight","On Monday morning",1]],
g:`tell → told, sell → sold, begin → began, keep → kept, think → thought, choose → chose · in 2020 · on Wednesday · at midnight`,
gx:`I told my boss about the problem.|Le conté a mi jefe sobre el problema.
The project began in March.|El proyecto empezó en marzo.
We made a profit this year.|Tuvimos utilidad este año.
I thought about it all night.|Lo pensé toda la noche.`,
v:`🗓️ in|en (meses y años)|In May. In 2026.
📅 on|en / el (días y fechas)|On Monday. On May third.
⏰ at|a las (horas)|At nine. At night.
⏳ for|durante (cuánto tiempo)|For two hours.
⏱️ since|desde|Since 2018.
🔚 until|hasta|Until Friday.
⏮️ before|antes de|Before lunch.
⏭️ after|después de|After work.
🕐 during|durante (un evento)|During the meeting.
📆 by|para (fecha límite)|By Friday.`,
s:`I began my career in audit in 2018.|Empecé mi carrera en auditoría en 2018.|in
We pay suppliers on Fridays.|Les pagamos a los proveedores los viernes.|on
The meeting is at four.|La reunión es a las cuatro.|at
Send the report by Thursday.|Envía el reporte para el jueves.|by
I told the CFO the news.|Le conté la noticia al gerente financiero.|told
We sold the dollars at three seventy.|Vendimos los dólares a tres setenta.|sold
I worked until midnight.|Trabajé hasta la medianoche.|until
I kept the receipts.|Guardé los recibos.|kept`,
pp:`light|right
late|rate
long|wrong
lead|read`,
sh:`I began in 2018.
On Wednesday, at midnight.
I told you, the rate is late.
We sold it for a lot of money.`,
sp:["When did you begin your career? Tell me the story.","What do you usually do on Fridays?","What did you sell or buy recently?"]},

18:{tag:'short',
st:`On Wednesday, the mission started. But it was a trap!|El miércoles empezó la misión. ¡Pero era una trampa!
Roshark's robots caught María and Tiko.|Los robots de Roshark atraparon a María y a Tiko.
They put them in a prison under the mountains.|Los metieron en una prisión debajo de las montañas.
"Are you OK?" asked Tiko. "Yes, I am. And you?" "So am I."|"¿Estás bien?", preguntó Tiko. "Sí. ¿Y tú?" "Yo también."
"Do you have a plan?" "No, I don't. Do you?" "Yes, I do!"|"¿Tienes un plan?" "No. ¿Y tú?" "¡Sí!"
Tiko took a small tool from his shoe.|Tiko sacó una herramienta pequeña de su zapato.
"Can you open the door with that?" "I think so."|"¿Puedes abrir la puerta con eso?" "Creo que sí."
Click! The door opened.|¡Clic! La puerta se abrió.`,
q:[["What was the mission?","A trap","A party","A trip",0],["Where was the prison?","Under the mountains","In the city","On Saturn",0],["What did Tiko have in his shoe?","A key","A small tool","A phone",1]],
g:`Respuestas cortas: Yes, I am / No, I don't · Yo también: So am I / So do I · Yo tampoco: Neither am I / Neither do I · I think so / I don't think so`,
gx:`Are you ready for the audit? Yes, I am.|¿Estás listo para la auditoría? Sí.
I'm tired. So am I.|Estoy cansado. Yo también.
I don't like Mondays. Neither do I.|No me gustan los lunes. A mí tampoco.
Will the rate go down? I don't think so.|¿Bajará la tasa? Creo que no.`,
v:`🔓 open|abrir|Open the door.
🔒 close|cerrar|Close the account.
🤝 meet|reunirse / conocer|We meet on Monday.
💡 explain|explicar|Explain the report.
✍️ sign|firmar|Sign here, please.
📤 transfer|transferir|Transfer the money.
✅ approve|aprobar|Approve the payment.
🔎 review|revisar|Review the numbers.
🙋 ask|preguntar / pedir|Ask the bank.
💾 save|guardar / ahorrar|Save the file.`,
s:`Are you ready? Yes, I am.|¿Estás listo? Sí.|am
I love coffee. So do I.|Me encanta el café. A mí también.|So do I
Did you approve it? No, I didn't.|¿Lo aprobaste? No.|didn't
I'm not tired. Neither am I.|No estoy cansado. Yo tampoco.|Neither am I
Will it rain? I don't think so.|¿Va a llover? Creo que no.|think so
Can you sign today? Yes, I can.|¿Puedes firmar hoy? Sí.|can
We need to review the numbers.|Necesitamos revisar los números.|review
Please transfer the money today.|Por favor transfiere el dinero hoy.|transfer`,
pp:`full|fool
look|Luke
pull|pool
could|cooed`,
sh:`So am I.
Neither do I.
I think so.
Good food and a cool book.`,
sp:["Answer with short answers: Do you like Mondays? Are you tired? Can you cook?","Do you agree? Treasury is the most important area in a company.","What verbs do you use every day at work?"]},

19:{tag:'past',
st:`María and Tiko ran out of the prison.|María y Tiko salieron corriendo de la prisión.
They found Roshark's machine. It was full of water bottles.|Encontraron la máquina de Roshark. Estaba llena de botellas de agua.
Roshark stood in front of them. "You can't stop me!"|Roshark se paró frente a ellos. "¡No pueden detenerme!"
María threw a bottle at the machine. It broke!|María le lanzó una botella a la máquina. ¡Se rompió!
Water flew everywhere. Roshark fell down.|El agua voló por todas partes. Roshark se cayó.
Mr. Fagorz and the police arrived. They caught Roshark at last.|Llegaron el señor Fagorz y la policía. Por fin atraparon a Roshark.
The water went back to the city.|El agua volvió a la ciudad.
Everybody won. María felt like a real hero.|Todos ganaron. María se sintió una verdadera heroína.`,
q:[["What did María throw?","A bottle","A tool","A shoe",0],["What happened to the machine?","It broke","It flew","It disappeared",0],["Who caught Roshark?","Tiko","The police and Mr. Fagorz","Gregob",1]],
g:`stand → stood, throw → threw, break → broke, fall → fell, fly → flew, win → won, catch → caught, bring → brought`,
gx:`I won the bet with my team.|Gané la apuesta con mi equipo.
The system broke on Monday.|El sistema falló el lunes.
The price fell five percent.|El precio cayó cinco por ciento.
She brought the documents.|Ella trajo los documentos.`,
v:`💻 laptop|portátil|My laptop is slow.
🖨️ printer|impresora|The printer is broken.
📱 phone|teléfono / celular|My phone is dead.
🗄️ file|archivo|Save the file.
📨 email|correo|I got your email.
⏳ deadline|fecha límite|The deadline is Friday.
💼 budget|presupuesto|We have a small budget.
🏧 ATM|cajero automático|The ATM is broken.
🔑 password|contraseña|I forgot my password.
🚚 supplier|proveedor|Call the supplier.`,
s:`The price of sugar fell last month.|El precio del azúcar cayó el mes pasado.|fell
I brought my laptop.|Traje mi portátil.|brought
The system broke during the closing.|El sistema falló durante el cierre.|broke
We caught the error in time.|Detectamos el error a tiempo.|caught
Our team won the football game.|Nuestro equipo ganó el partido de fútbol.|won
The deadline is next Friday.|La fecha límite es el próximo viernes.|deadline
I forgot my password again.|Olvidé mi contraseña otra vez.|forgot
The supplier sent the invoice late.|El proveedor envió la factura tarde.|supplier`,
pp:`latter|ladder
writing|riding
metal|medal
water|warder`,
sh:`Water, water everywhere.
A little bottle of water.
Get it out of the city.
What a beautiful day!`,
sp:["Tell me about a battle you won at work.","What broke recently at your office or at home?","What is your biggest deadline this month?"]},

20:{tag:'tense',
st:`A week later, there was a big party in Alienapolis.|Una semana después hubo una gran fiesta en Alienápolis.
Gregob gave María a gold medal.|Gregob le dio a María una medalla de oro.
"Thank you for your help. You are a true friend of our planet."|"Gracias por tu ayuda. Eres una verdadera amiga de nuestro planeta."
Then Mr. Fagorz said, "We have a little surprise for you."|Luego el señor Fagorz dijo: "Tenemos una pequeña sorpresa para ti."
A door opened. María's mother and brother came in!|Se abrió una puerta. ¡Entraron la mamá y el hermano de María!
María cried and hugged them. "How did you get here?"|María lloró y los abrazó. "¿Cómo llegaron aquí?"
"Beep brought us on the ship!" said her brother.|"¡Beep nos trajo en la nave!", dijo su hermano.
That night, María danced, sang and spoke English with everybody.|Esa noche María bailó, cantó y habló inglés con todos.`,
q:[["What did Gregob give María?","A gold medal","A ship","A house",0],["Who came in?","Her mother and brother","Roshark","The police",0],["Who brought them?","Tiko","Beep","Gregob",1]],
g:`Repaso A1: be · presente simple · can · was / were · pasado · will · would like · there is / there are`,
gx:`I'm the head of treasury and I live in Peru.|Soy el jefe de tesorería y vivo en Perú.
Yesterday I went to the bank, and tomorrow I'll go again.|Ayer fui al banco y mañana iré otra vez.
There are four cats in my house.|Hay cuatro gatos en mi casa.
I'd like to speak English fluently.|Quisiera hablar inglés con fluidez.`,
v:`🎉 party|fiesta|The party was great.
🥇 medal|medalla|A gold medal.
🎁 surprise|sorpresa|What a surprise!
🧑‍🤝‍🧑 friend|amigo|You're a true friend.
✈️ trip|viaje|A trip to Colombia.
🚆 train|tren|The train is late.
🚛 truck|camión|The truck carries sugarcane.
🌾 sugarcane|caña de azúcar|We grow sugarcane.
💭 dream|sueño|My dream is to travel.
🏆 goal|meta|My goal is clear.`,
s:`There are four cats in my house.|Hay cuatro gatos en mi casa.|are
I went to the bank and paid the invoice.|Fui al banco y pagué la factura.|went
I'd like to travel to Colombia in December.|Quisiera viajar a Colombia en diciembre.|I'd like
I can read reports in English.|Puedo leer reportes en inglés.|can
Yesterday was a long day.|Ayer fue un día largo.|was
The trucks bring the sugarcane.|Los camiones traen la caña de azúcar.|bring
My dream is to be the treasury manager.|Mi sueño es ser el gerente de tesorería.|dream
Would you like to come to the party?|¿Te gustaría venir a la fiesta?|Would`,
pp:`trip|drip
train|drain
try|dry
true|drew`,
sh:`Try the train, not the truck.
My dream came true.
The trucks bring the sugarcane.
What a surprise!`,
sp:["Tell me the story of María in your own words.","What is your dream for the next five years?","What was the best surprise of your life?"]}
};
