/* ===== Enlaces a las clases de Gringo Academy (Hotmart) por unidad =====
   formato: unidad|telenovela|recursos|song|tvshow|listening|speaking  ( '-' = no existe ) */
const HM = 'https://hotmart.com/es/club/gringolandia/products/5125527/content/';
const LINKS_RAW = {
L1: `1|64lN98X37j|E4zDW6n17l|-|-|oODd0LmwOP|146QnbBbOd
2|3eag5E0qOg|V4Vxk32x72|YOmBy3ZQ4d:1|-|V73Ro5PDe3|NOwB0wl27m
3|ROxvMBXJeD|M7qaKkmn7x|E4zDLR3o7l:2|-|x7W8BrZYO2|14oRKWN5Op
4|V73RvWNpe3|meL1lz0a7n|97BEdjGlep:3|-|YOmBzk0g4d|V73RvPBre3
5|94JAzr50Og|y4Pv2aqb7x|y4PvDrgE7x:4|-|k45abr5N4l|M7GnErXVew
6|o4E51ANY4z|64lNEyLM7j|k45a2nWx4l:5|-|RON1vbxd7P|97BEq6LGep
7|o4E51A294z|y4PvDr6y7x|gOpDZgNqOJ:6|-|b4KdjZ6DeX|Me1B3YEW7Y
8|o4E5k5yR4z|Z72vkvZq7N|64lNQ1rQ7j:7|-|E4zDyLxQ7l|ROxvNmBgeD
9|0OvqNqLd7j|R4jpQprd7a|EOgYRkGqe6:8|-|NOwBjBQ97m|oODdJpAWOP
10|146QkQMbOd|y4Pv8vwD7x|Me1BkE1j7Y:9|-|V73RkRQ3e3|meL1azPY7n
11|RO9q15nMOP|94J9bBWbOg|YOmN6zn64d:11|-|94J9blBYOg|97Bg6AnxOp
12|M7qdZKmmex|o4EgAXvZ7z|3eaQPA3qeg:12|-|LO0B52MAeG|R4jbw06w4a
13|BOn06vvpeR|m7YPdlE6e6|YOmN6B564d:13|-|94J9bAYAOg|x7WGPLR272
14|k7Q1ZRDr7y|m7YPdPYze6|r488N8aD4R:14|-|LO0B5BzBeG|146VPQYQ4d
15|64lwywj3Oj|97Bg6g8JOp|NOwQqQg2em:15|-|gOpbgbNVeJ|LO0B5B0weG
16|0OvakavB7j|14oPdPxBep|PeAgdgvPOW:16|-|m7YPdPVAe6|kOXo6xYB7W
17|k7Q1ZBxq7y|94J9bQdnOg|V7yxEg51eJ:17|-|NOwQqArAem|Me1vMaEw7Y
18|oODgjzlb7P|NOwQqAB9em|r488NExE4R:18|-|RO9q128vOP|K4klq2l0eY
19|r488NEMD4R|E4z81zvD7l|R4jbwjvw4a:19|-|k45Qn81o4l|m7YPd8wze6
20|Z72RrQKY7N|r488NErJ4R|EOg2lpaZ76:20|-|97Bg62rqOp|x7WGPVar72`,
L2: `1|97BEGZZxep|oODdLNNmOP|0Ovq88dx7j:1|PeAAzaaVeW:1|a4RDXB9a7n|k7QRb9nJOy
2|0OvqwxjV7j|E4zDdE6Q7l|k7QRWP5zOy:2|0Ovq0x5x7j:2|M7GnaEpNew|K4k3YX3z4Y
3|0OvqaZYx7j|M7qadMAm7x|37dL8mx67L:3|14oRP8jMOp:3|V73RDJrZe3|k7QR1m0JOy
4|NOwBAoda7m|a4RDvJ637n|BeZyqnp84w:4|0Ovqz0Dx7j:4|R4jpjkjA7a|BeZyqnyX4w
5|NOwB36rM7m|RON1yJdY7P|BeZy2K954w:5|V4VxyKkv72:5|3eag2l58Og|oODd58RwOP
6|gOpDZg69OJ|64lNEyB27j|K4k3Mqbk4Y:6|z7rQNdV0ej:6|y4bkvnDdeR|b4KdjERKeX
7|E4zDp12l7l|K4k3Mqpk4Y|meL1X06a7n:7|14oRbdDYOp:7|0Ovq3k587j|k7QRagjkOy
8|kOXqjQQW4W|ROxvPLaBeD|z7rQbAWoej:8|M7qaLYyn7x:8|M7qaLYqR7x|y4bkAZPPeR
9|z7rQbAr0ej|RON18XwV7P|o4E5nWlV4z:9|meL1Vyy27n:9|R4jpVAR27a|LO0q8o6Y4G
10|b4KdQ2J0eX|b4KdQ2kNeX|E4zD69D17l:10|R4jpVAAd7a:10|a4RD15QR7n|K4k3xBrz4Y
11|gOpbZGR9eJ|V4V1q5NEO2|Me1v3Dx87Y:11|y4bVvxEd4R:11|k45Q2xdj4l|M7qd2Goyex
12|RO9qBE2YOP|x7WGM5Vw72|o4Eg193R7z:12|Me1v3Dgj7Y:12|meL9Xr2l7n|y4bVvxKk4R
13|146VN8pK4d|k45Q2xmr4l|NOwQykmKem:13|m7YP15AJe6:13|37d8DqaM7L|M7G9b5pB4w
14|K4klMGVJeY|YOmN1G8X4d|3eaQBVKneg:14|k7Q1aoqJ7y:14|V4V1q5bEO2|r488XM2w4R
15|BeZNL5A3ew|E4z8pGAQ7l|x7WGM5Jg72:15|m7YP15J6e6:15|37d8DqJy7L|z7rBNGJ07j
16|y4P9D5qLex|V7yx92ZGeJ|Z72RLanQ7N:16|RON9v5PJ7P:16|R4jbqGEA4a|EOg2V18V76
17|BOn0LmKgeR|RO9qBEMYOP|37d8DqZB7L:17|M7G9b5gP4w:17|z7rBNGnP7j|14oPbGzJep
18|y4P9D5zmex|V7yx92APeJ|b4K9jz357X:18|E4z8pG3w7l:18|PeAg8NE1OW|BOn0LmNZeR
19|146VN8zb4d|EOg2V1Gq76|PeAg8No1OW:19|BOn0LmRZeR:19|RO9qBEnMOP|x7WGM5XY72
20|V73DbQjxO3|97BgqNYqOp|3eaQBV3beg:20|k7Q1aoVP7y:20|meL9Xrvg7n|y4bVvx584R`,
L3: `1|2OM1EZ1oO6|o4E5Qx5m4z|BeZyEnl34w:1|0OvqpQjB7j:1|BeZykAyp4w|Z72v2PvJ7N
2|Z72vzLR57N|3eagMEkkOg|k45aoBXR4l:2|oODdll0NOP:2|k7QRWaorOy|3eagMBVBOg
3|Me1BBzlN7Y|94JAAYXAOg|M7GnnwX9ew:3|M7qaar8m7x:3|97BEEwyLep|M7qaarXv7x
4|146QMQwQOd|V4VxW1Gr72|0OvqraWd7j:4|0Ovqrapd7j:4|Z72vVREy7N|0OvqrzlW7j
5|BeZyWyv54w|146QMqMyOd|y4bkWVK8eR:5|V73RxDEQe3:5|Z72vVvDJ7N|146QMqmyOd
6|LO0qwxAY4G|Z72vwqMJ7N|r48xrZkv4R:6|ROxvyZXpeD:6|meL1BDa27n|V4VxMLbk72
7|r48xDyDE4R|meL13w3W7n|M7GnjwjNew:7|94JAywykOg:7|YOmBPrb64d|3eag8rRqOg
8|NOwB92oE7m|37dLEm9K7L|a4RDnmLD7n:8|3eag8mPpOg:8|V4VxYmry72|ROxvWN6JeD
9|Me1BwJxW7Y|BeZyvmEl4w|LO0qWJ3R4G:9|RO98aJdm7P:9|m7YlBm6Ae6|z7rQKE5xej
10|3eag8m58Og|k7QRAmN5Oy|r48xDJmv4R:10|M7qagM6W7x:10|2OM1gmD1O6|meL13mR27n
11|3eaQDDAkeg|a4RYPP0DOn|k7Q1XXo57y:11|2OMJZZpR46:11|a4RYPPqLOn|V4V1ggLkO2
12|o4EgxxPg7z|BeZNAA05ew|r488336v4R:12|o4EgxxKg7z:12|BeZNAAz5ew|y4P9jjpDex
13|3eaQDDEqeg|y4bVaa1d4R|RO9q00V3OP:13|37d8VVjd7L:13|y4P9jjqmex|94J911ybOg
14|a4RYPPnDOn|3eaQDD1beg|oODgVBrv7P:14|k7Q1XLQk7y:14|R4jb1Jxa4a|V7yx3L6MeJ
15|M7qdXn6Rex|o4EgxzRw7z|x7WGKDBg72:15|97Bga5APOp:15|a4RYPpjrOn|oODgVKXQ7P
16|y4bplv287R|BeZqRL3X4w|kOXxBEVdOW:16|y4PEVDn1ex:16|V7ygJ98o4J|146q5NDyOd
17|LO0DyEj9OG|PeA2z8D07W|m7Y8v10Ze6:17|37dpGDVL7L:17|gOpydZjG4J|64l2KEbD7j
18|RONqavPV7P|R4jjkqEV4a|b4KVvjNNOX:18|LO0DyE0YOG:18|PeA2z8xo7W|BOnw9LZz4R
19|PeA2Q3PV7W|BOnw5X3g4R|z7r2woqP7j:19|14ow5LVJ4p:19|64l2mMDX7j|oODz8aPxeP
20|r48Ebw6neR|o4EB3aKRez|V4VQK6zyO2:20|r48Ebw6ZeR:20|M7qpy9vvex|2OM8NMWn76
21|y4bpG0zP7R|R4jjvBQV4a|oODzPwNmeP:21|oODzPwVbeP:21|RONqQx3G7P|m7Y8wj0Ke6
22|k7QBwlBkOy|m7Y8rpPWe6|M7GRw2daew:22|YOmprWAA7d:22|V7ygQ1qq4J|146qX1dmOd
23|V73VJg82e3|97B2l0YR7p|V4VQm0EkO2:23|ROxwNEDp7D:23|r48EJ95veR|2OM8m6R176
24|r48EJNw3eR|Me1aJMWweY|LO0DJ5VyOG:24|NOwA2qoAem:24|z7r2Edaq7j|64l2Qy0E7j
25|V73VJNNYe3|0OvzZkkxOj|V4VQmrr2O2:25|ROxwN66x7D:25|M7qpMZZmex|2OM8mLLy76
26|EOg5gMRge6|LO0bpYkyeG|V73PqrkYO3:26|meL2M6VzOn:26|R4jmXLVpOa|1469nBbAOd
27|V7ykYLwk4J|LO0bpP0aeG|64lm9BLbej:27|YOmk9vbXed:27|oOD8LByvOP|r48bnAqE7R
28|Z72j2bAP7N|kOXKgawN7W|M7GE6LBa4w:28|Me1gN1LyOY:28|14o5vxQY7p|K4kkXmvk4Y
29|gOpmRqoP4J|YOmk9Ddjed|ROxAYKDJ4D:29|2OMNEKRn46:29|97BVGDYq7p|0OvoJyvm4j
30|BeZKEgEp7w|Z72joyoJ7N|k45bdzdNel:30|LO0b3N3YeG:30|BOn5pXpz7R|x7W0969RO2`,
L4: `1|m7YKlakK46|M7qyaAom7x|Z72jvDvL7N:1|RONJ1W1AOP:1|Me1gBRB8OY|PeAQAjgDeW
2|gOpmD0kb4J|a4R2D3Kr4n|r48bxqlD7R:2|2OMN19k946:2|k7Q2RdynOy|o4E356WZ7z
3|y4bKkLokeR|BeZKyQzN7w|LO0bqvXweG:3|M7GEngKP4w:3|b4KWdAKJ4X|gOpmD0BV4J
4|meL2V6rZOn|y4P2Mz5j7x|k7Q2E08qOy:4|V4VK2wL2e2:4|k7Q2E08zOy|o4E3nZPY7z
5|R4jmVL6WOa|94JzaPkn4g|0OvojKy54j:5|3eal0a6n4g:5|LO0b8YMyeG|RONJ8MLdOP
6|M7qyLQoR7x|0OvojMwN4j|1469bz53Od:6|E4zN6bkD4l:6|kOXKjPBX7W|RO9lNn537P
7|M7qyLQpv7x|2OMNxq8n46|z7rwbVwoOj:7|64lm8Bm9ej:7|NOw6XEAE7m|M7qyLQbm7x
8|2OMNxd1k46|97BVz5EP7p|RONJ8G1zOP:8|y4P2Mov07x:8|Z72jMxvP7N|1469bEQxOd
9|EOg5DXPPe6|E4zN6JZj4l|E4zN6JEj4l:9|BOn5Mzgq7R:9|k45bLMGrel|RO9lNbGN7P
10|gOpm1AJq4J|YOmkqKX6ed|2OMNxdyk46:10|meL2VYPWOn:10|ROxAPr9V4D|k45bLMWjel
11|b4KWQBmW4X|K4kAlyBo7Y|RONy9N8V7P:11|y4Pd9XMj4x:11|K4kAlya57Y|b4Kp9bQNeX
12|RONy9BPV7P|R4jAbREVOa|Me1ov5RwOY:12|Z72dRgD64N:12|M7qYdqAm7x|V7ynxNA1OJ
13|NOw3QDjbOm|K4kAlrVy7Y|94Jg9w5jeg:13|K4kAlrK17Y:13|oOD5gmAN4P|0OvPaRQdej
14|PeAZgJpJ7W|BOnW0xbq4R|97BWgloROp:14|k7Qy1mvx7y:14|K4kAlaE57Y|M7qYdM3W7x
15|R4jAbDDpOa|kOXyommo4W|RO93qJJKeP:15|x7WyGmmE42:15|BOnW0xxb4R|NOw3Q221Om
16|14oAoyDB7p|14oAoQL97p|r48l6Px04R:16|m7Y2zj8zO6:16|EOgmowzGe6|r48l6PZZ4R
17|gOpkBVE97J|K4kAovVJ7Y|V7ynqZ8MOJ:17|0OvPV1N5ej:17|RONyYx8d7P|EOgmowyBe6
18|ROxdlEYaOD|r48lg9nJ4R|RO93m9dmeP:18|LO0rdV3ReG:18|R4jAd9ZYOa|y4Pd3Gvj4x`,
L5: `1|R4jmVWgdOa|-|-|-|-|-`
};
const COMIC_LINKS = { L1: 'PeAgjWz1OW', L2: '3eaQ1Ggbeg' };
const PR_LINKS = 'meL2yVXaOn R4jmAVq2Oa x7W0yNAgO2 V73PAEmQO3 k7Q2yErrOy b4KWpQJw4X E4zN96BD4l V73PAEY3O3 meL2yVBYOn 94JzgaZo4g V4VKy23re2 kOXKyjR57W RO9l3NGY7P V4VKy28re2 meL2yVklOn BOn5WMVg7R V73PAEKrO3 YOmkAqVjed gOpmk1EP4J M7qyYL1v7x V4VKy2b8e2 z7rwAbb2Oj V4VKy2ave2 1469AbbyOd k7Q2yE9POy V7ykny3d4J EOg5mDqpe6 E4zN96A94l BOn5WM2o7R x7W0yNKrO2 37d5kBVPOL 94Jzga1Y4g V73PAEyBO3 r48bl23A7R BeZK2PJl7w R4jmAV3YOa kOXKyjJB7W V7yknyDd4J EOg5mDJpe6 BOn5WMJo7R V73PAEwBO3 EOg5mDLPe6 PeAQZKqJeW x7W0yNWQO2 64lmA8jBej ROxAdPbp4D Me1goqLaOY Z72jdM3q7N y4P2dMqD7x b4KWpQab4X RO9l3NyN7P NOw63XLK7m 0OvoPjn64j 0OvoPjno4j r48bl2DX7R y4bKXAqPeR RONJy8KVOP k45bALBNel E4zN96Yo4l PeAQZK1oeW x7W0yNdRO2 37d5kBQXOL YOmkAqbBed 0OvoPj5o4j 3eal20R94g k7Q2yE5zOy 2OMNkxXo46 BeZK2Pwp7w k45bALwNel EOg5mD8be6 ROxAdPGB4D o4E3Wn6m7z a4R2K13a4n ROxAdPGx4D o4E3Wn6Y7z y4bKXALLeR Z72jdMD67N 64lmA8ZEej ROxAdP0x4D r48bl2R37R kOXKyjda7W EOg5mDGge6 LO0br8PyeG RO9l3Nn87P NOw63XEA7m gOpmk1an4J 64lmA8BEej 0OvoPjMx4j 3eal20nm4g V4VKy2j2e2'.split(' ');
const GS_GUIDE_LINK = 'z7r21KbN7j';
const GS_RAW = `¿Cómo hablar con el oficial de inmigración en tu ingreso al país?|YOmpxPqQ7d
Hacer "check-in" en un hotel|0Ovz2njNOj
¿Cómo echar gasolina en EE. UU.?|RONqoK3E7P
Sobrevive en un restaurante|R4jjaNgw4a
Inscríbete al gimnasio|146qKvD3Od
Sobrevive en el Drive-Thru|k458lBRoOl
Ir de compras con seguridad|EOgpvbyE46
Sobrevive a tu cita médica|b4KVo6glOX
¿Qué hacer si te para un policía?|LO0DKWABOG
Sobrevive en la farmacia|BOnw8yA54R
Sobrevive a un vuelo cancelado|RO92KaV34P
¿Cómo alquilar un vehículo?|37dpPEjd7L
Ir por un corte de cabello (hombres)|M7GRojP8ew
Ir por un corte de cabello y unas mechas (mujeres)|z7r21KvN7j
Comprar un carro en EE. UU.|14owq6nZ4p
Crear una cuenta bancaria|94JQoy5oOg
¿Cómo depositar o retirar dinero de tu cuenta bancaria?|64l2VXz37j
¿Cómo ir al salón de belleza para ponerte uñas?|K4k2QjKyOY
Pedir un reembolso en la tienda|97B2oLZl7p
Comprar lentes de aumento|0Ovz2nQNOj
Comprar un nuevo celular|V4VQVYa9O2
¿Cómo pedir un café?|r48EKDQDeR
¿Cómo cambiar el aceite de tu vehículo?|2OM8ogz976
Sobrevive el día a día en el gimnasio|97B2oLZJ7p
¿Cómo trabajar con un entrenador personal?|a4RvRnBx4n
¿Cómo hablar con el 911 durante una emergencia?|k7QBvAXlOy
Accidente vehicular|ROxwjWzg7D
¿Cómo contratar un seguro médico?|o4EBo2xRez
¿Cómo sobrevivir a tu cita con el dentista?|y4bpjqak7R
Sobrevive a tu primera cita con un gringo|Z72QKYPQeN
Preséntate con tus vecinos|R4jjaN1A4a
Aceptar o rechazar una invitación|y4PEB0jxex
Hablar sobre tus pasatiempos|YOmpxPZg7d
¿Cómo socializar en una fiesta?|97B2oLaJ7p
¿Cómo ponerte al día con un amigo?|oODzoZVxeP
Dominar modales del día a día|V4VQVYJrO2
¿Cómo chismear con tu amigo gringo?|ROxwjWRg7D
Prepárate para tu entrevista de trabajo|2OM8og3r76
¿Cómo aceptar una oferta de trabajo y negociar tu sueldo?|o4EBo2NRez
Pedir un aumento de salario|Z72QKYWQeN
Sobrevive a un “meeting”|kOXx8GJ5OW
Sobrevive a ser despedido|y4PEB0Axex
¿Cómo renunciar a tu trabajo?|146qKvRmOd
¿Cómo resolver reclamos de clientes?|b4KVo65JOX
¿Cómo pedir tus placas o licencia en el DMV?|PeA2l1LV7W
Sobrevive a tu prueba de manejo|x7WVxdJwe2
Ser arrestado en EE. UU.|m7Y8qBJNe6
Registrar a tu niño en la escuela|z7r21KJP7j
Sobrevive a un “Parent-Teacher Conference”|14owq6JJ4p
¿Cómo orar por los alimentos?|0Ovz2nAWOj
¿Cómo rezar?|3eapN8xp4g
¿Cómo dar tu opinión?|ROxwjW9J7D
¿Cómo hablar sobre política?|M7qp3g5vex
¿Cómo discutir?|2OM8ogyn76
Sobrevive al aeropuerto en EE. UU.|o4EBo2LVez`;
const GSMETA = GS_RAW.split('\n').map((l, i) => { const [t, id] = l.split('|'); return `${t}|Audio ${i + 1} de la Guía de supervivencia 2.0|||${'Audio ' + (i + 1)}|${HM + id}`; }).join('\n');
/* aplica enlaces y nombres reales de Real Life English a las unidades */
const RLEFIX = {};
for (const lid in LINKS_RAW) LINKS_RAW[lid].split('\n').forEach(l => {
  const [n, tele, rec, song, tv, lt, sp] = l.split('|');
  const r = []; const us = [];
  if (song !== '-') { const [id, num] = song.split(':'); r.push('Song #' + num); us.push(HM + id); }
  if (tv !== '-') { const [id, num] = tv.split(':'); r.push('TV Show #' + num); us.push(HM + id); }
  RLEFIX[`${lid}-${n}`] = { r: r.join(' · '), u: us[0] || '', u2: us[1] || '', tele: tele !== '-' ? HM + tele : '', rec: rec !== '-' ? HM + rec : '', lt: lt !== '-' ? HM + lt : '', sp: sp !== '-' ? HM + sp : '' };
});
