// Bitácora de avances del proyecto.
// Para registrar una semana nueva, agregar un bloque al final de SEMANAS.
// Campos opcionales: resultados, evidencias, medios, notaMedios.

const PROYECTO = {
  titulo: "Estrategia de Aprendizaje por Imitación para la Manipulación de Objetos con una Mano Robótica Multidedo",
  subtitulo: "Caso de estudio con objetos estipulados por el estándar de pruebas Yale-CMU-Berkeley (YCB)",
  institucion: "Universidad Santo Tomás · Facultad de Ingeniería Electrónica · Grupo de Estudio y Desarrollo en Robótica (GED)",
  repositorio: "https://github.com/V01D-Szp/Tesis_IL",
  // Imágenes del encabezado: [{ archivo: "img/nombre.jpg", descripcion: "..." }]
  imagenes: []
};

const SEMANAS = [
  {
    id: "2026-10-05",
    fechas: "5 – 9 de octubre",
    titulo: "Revisión técnica del hardware e inicio del retargeting",
    resumen: "Control de brazos y manos del Unitree G1 y seguimiento de la mano del operador con MediaPipe.",
    introduccion: "Revisión técnica y control del hardware (Unitree G1 + manos BrainCo Revo2) e inicio del retargeting hacia la mano.",
    actividades: [
      "Control por consola de codos, muñecas y hombros con el SDK de Unitree (arm_sdk), con límites de seguridad medidos en pruebas físicas (codo −120°/+40°, muñeca ±110°, hombro 110°).",
      "Apertura y cierre de las manos Revo2 por Modbus (4 dedos y luego pulgar).",
      "Seguimiento de la mano con MediaPipe: flexión de cada dedo (0–1) con calibración abierta/cerrada."
    ],
    evidencias: [
      {
        items: [
          { texto: "Código de control de brazos y manos", url: "https://github.com/Unitree-SERO/unitree-g1-sero/tree/main/manos/juan" },
          { texto: "Control de brazos por consola (prueba física)", url: "https://www.youtube.com/watch?v=RYigfqRlKDU" },
          { texto: "Prueba general de manos y brazos", url: "https://www.youtube.com/watch?v=GvAgVtLo2kQ" }
        ]
      }
    ]
  },
  {
    id: "2026-10-12",
    fechas: "12 – 16 de octubre",
    titulo: "Herramientas de software para el Aprendizaje por Imitación",
    resumen: "Selección del entrenamiento, los modelos de control, los datasets de prueba, la simulación y la teleoperación.",
    introduccion: "Revisión de las herramientas de software para entrenar el sistema por Aprendizaje por Imitación (IL) y para recolectar las demostraciones.",
    actividades: [
      "El IL entrena un modelo a partir de ejemplos de la tarea realizados por una persona (demostraciones). Se definió empezar practicando el entrenamiento con conjuntos de datos (datasets) públicos de prueba, antes de montar la simulación del robot.",
      "Se seleccionó LeRobot, librería de código abierto de Hugging Face para aprendizaje en robótica, junto con su adaptación oficial para el robot Unitree G1. Ambas funcionan sobre PyTorch, librería estándar de inteligencia artificial.",
      "Se eligió ACT (Action Chunking with Transformers), que predice secuencias cortas de movimientos, como modelo base, y Diffusion Policy como alternativa de comparación. Se descartaron los modelos VLA (visión-lenguaje-acción) por requerir equipos de cómputo de alta capacidad.",
      "Se seleccionaron PushT (empujar un objeto en 2D) y ALOHA sim (brazos simulados manipulando objetos) como datasets de prueba, publicados por los desarrolladores de LeRobot; los datos reales del G1 publicados por Unitree se usarán en una etapa posterior.",
      "Se eligió MuJoCo, simulador físico libre que funciona sin tarjeta gráfica especializada; Isaac Sim (NVIDIA) queda como opción secundaria por requerir una tarjeta gráfica NVIDIA RTX. La mano Revo2 no viene incluida en ninguno, por lo que debe importarse a partir del modelo 3D oficial del fabricante (archivo URDF).",
      "La herramienta oficial de Unitree (`xr_teleoperate`) ya es compatible con la mano Revo2, pero requiere un visor de realidad virtual o aumentada (XR). Como referencia se tomó DexPilot, que controla la mano robótica solo con cámaras, enfoque similar al desarrollado en el proyecto con MediaPipe (detección de la mano humana por visión)."
    ],
    resultados: [
      "Se logró la teleoperación de la mano robótica mediante visión por computador: utilizando la cámara del portátil, el sistema detecta la mano del operador y estima la flexión de cada dedo, y la mano del robot replica en tiempo real los movimientos realizados por la persona, dedo por dedo."
    ],
    evidencias: [
      {
        grupo: "Enfoque",
        items: [
          { texto: "Revisión del Aprendizaje por Imitación en manipulación diestra (An et al.)", url: "https://arxiv.org/abs/2504.03515" }
        ]
      },
      {
        grupo: "Entrenamiento",
        items: [
          { texto: "Adaptación oficial de LeRobot por Unitree para el G1", url: "https://github.com/unitreerobotics/unitree_IL_lerobot" }
        ]
      },
      {
        grupo: "Modelos de control",
        items: [
          { texto: "Artículo original de ACT (Zhao et al., 2023)", url: "https://arxiv.org/abs/2304.13705" },
          { texto: "Artículo original de Diffusion Policy (Chi et al., 2023)", url: "https://arxiv.org/abs/2303.04137" }
        ]
      },
      {
        grupo: "Datasets de prueba",
        items: [
          { texto: "Datasets públicos de LeRobot en Hugging Face (incluye PushT y ALOHA sim)", url: "https://huggingface.co/lerobot" }
        ]
      },
      {
        grupo: "Simulación",
        items: [
          { texto: "Documentación de LeRobot para el G1 en MuJoCo", url: "https://huggingface.co/docs/lerobot/en/unitree_g1" },
          { texto: "Requisitos de Isaac Sim (GPU NVIDIA RTX)", url: "https://docs.isaacsim.omniverse.nvidia.com/latest/installation/requirements.html" }
        ]
      },
      {
        grupo: "Teleoperación",
        items: [
          { texto: "Teleoperación oficial de Unitree con visor XR (`xr_teleoperate`)", url: "https://github.com/unitreerobotics/xr_teleoperate" },
          { texto: "Artículo de DexPilot (Handa et al., 2020)", url: "https://arxiv.org/abs/1910.03135" }
        ]
      }
    ]
  },
  {
    id: "2026-10-19",
    fechas: "19 – 23 de octubre",
    titulo: "Entorno de entrenamiento y prueba con un dataset público",
    resumen: "Entorno aislado y reproducible con LeRobot sobre PyTorch, y análisis del dataset PushT.",
    introduccion: "Preparación del entorno de entrenamiento para el Aprendizaje por Imitación (IL) y prueba con un conjunto de datos público.",
    actividades: [
      "Configuración de un entorno de trabajo aislado y reproducible, con las versiones de cada dependencia registradas.",
      "Organización del proyecto en componentes independientes de entrenamiento, teleoperación y datos.",
      "Instalación de LeRobot sobre PyTorch, con los entornos de simulación PushT y ALOHA.",
      "Verificación del uso de aceleración por GPU para el entrenamiento.",
      "Descarga del dataset PushT desde su repositorio oficial, registrando la versión utilizada.",
      "Análisis de la estructura del dataset (demostraciones, imágenes, estados y acciones) como referencia para el formato de las demostraciones propias."
    ],
    evidencias: [
      {
        items: [
          { texto: "Librería LeRobot", url: "https://github.com/huggingface/lerobot" },
          { texto: "Dataset PushT (versión v3.0)", url: "https://huggingface.co/datasets/lerobot/pusht/tree/v3.0" },
          { texto: "Visualizador de las demostraciones de PushT", url: "https://huggingface.co/spaces/lerobot/visualize_dataset?path=/lerobot/pusht/episode_0" },
          { texto: "Artículo de referencia del dataset (Chi et al., 2023)", url: "https://arxiv.org/abs/2303.04137" }
        ]
      }
    ]
  },
  {
    id: "2026-10-26",
    fechas: "26 – 30 de octubre",
    titulo: "Sustentación del anteproyecto",
    resumen: "Presentación del anteproyecto.",
    tipo: "hito",
    introduccion: "Sustentación del anteproyecto.",
    actividades: []
  },
  {
    id: "2026-11-02",
    fechas: "2 – 6 de noviembre",
    titulo: "Teleoperación en simulación, límites y criterios de éxito",
    resumen: "Teleoperación del brazo y la mano del G1 en MuJoCo, registro automático de demostraciones y criterios de éxito.",
    introduccion: "Teleoperación del brazo derecho y la mano del Unitree G1 en simulación física (MuJoCo), con el robot sentado frente a una mesa, y definición de los límites del sistema y de los criterios de éxito.",
    actividades: [
      "Modelo oficial del G1 con la mano Revo2 importada desde su archivo URDF; robot sentado y fijo, mesa con una zona de inicio (azul) y una zona objetivo (verde), y objetos con las medidas y masas reales del estándar YCB (lata, pelota, cubo y banano).",
      "Ajuste de la fricción y del contacto entre los dedos y el objeto para que la mano pueda sostenerlo; en una prueba automática la lata se agarró y se llevó a la zona objetivo en 5 de 5 intentos.",
      "Una cámara de profundidad Intel RealSense mide la posición de la mano del operador y, mediante cinemática inversa, la mano del robot sigue esa posición y el giro de la muñeca; cada dedo del robot copia de forma proporcional la flexión del dedo del operador, incluida la oposición del pulgar.",
      "Postura de referencia con cuenta regresiva de 3 segundos y calibración de mano abierta y cerrada en dos orientaciones (de canto y con la palma hacia abajo), ya que la cámara mide los dedos de forma distinta en cada una.",
      "Cada intento se evalúa automáticamente como éxito (el objeto se levanta y queda en la zona verde) o como fallo (caída de la mesa, soltado fuera de la zona, volcado o empujado), y se guarda con las trayectorias del brazo, de la mano y del objeto.",
      "Rangos articulares tomados del modelo oficial del G1 y restringidos para la teleoperación (velocidad máxima de 90°/s por articulación), criterio de demostración exitosa y protocolo de evaluación con objetos vistos y no vistos, justificados con el estado del arte (Koczy et al., 2025; Yuan et al., 2025; Zhang et al., 2018; ByteDance Seed, 2025; Qin et al., 2022)."
    ],
    evidencias: [
      {
        items: [
          { texto: "Agarre y desplazamiento del objeto en simulación", url: "https://www.youtube.com/shorts/TX8ABFzU178" }
        ]
      }
    ]
  },
  {
    id: "2026-11-09",
    fechas: "9 – 13 de noviembre",
    titulo: "Repositorio del proyecto y viabilidad técnica del entrenamiento",
    resumen: "Publicación del repositorio y de la bitácora web, integración del entorno de entrenamiento y prueba de viabilidad técnica con Diffusion Policy.",
    introduccion: "Publicación del repositorio del proyecto, integración del entorno de entrenamiento y prueba de viabilidad técnica del entrenamiento antes de aplicarlo a las demostraciones de teleoperación.",
    actividades: [
      "Publicación del repositorio del proyecto con la estructura de componentes de entrenamiento, teleoperación y datos, y la documentación para instalar y reproducir el entorno.",
      "Integración al repositorio del entorno de entrenamiento, con las versiones de cada dependencia fijadas, y de los scripts de descarga y análisis de datasets.",
      "Publicación de la bitácora de avances del proyecto como página web, con las actividades y evidencias de cada semana.",
      "Prueba de viabilidad técnica del entrenamiento de Diffusion Policy con el dataset público PushT, para verificar el proceso completo antes de aplicarlo a las demostraciones de teleoperación; el error de entrenamiento se redujo de 1,091 a 0,089 y se estimaron los recursos de cómputo necesarios."
    ],
    resultados: [
      "El proceso de entrenamiento funcionó de principio a fin: carga de las 206 demostraciones del dataset, entrenamiento con aceleración por GPU, reducción sostenida del error y guardado del modelo. La reducción del error confirma que el aprendizaje funciona; el desempeño de la política en la tarea se evaluará en simulación después de un entrenamiento completo.",
      {
        titulo: "Error de entrenamiento (200 pasos, lotes de 32 muestras)",
        encabezados: ["Paso", "Error (loss)"],
        filas: [
          ["20", "1,091"], ["40", "0,865"], ["60", "0,466"], ["80", "0,222"], ["100", "0,168"],
          ["120", "0,131"], ["140", "0,108"], ["160", "0,096"], ["180", "0,091"], ["200", "0,089"]
        ]
      },
      {
        titulo: "Recursos medidos y estimados",
        encabezados: ["Medida", "Valor"],
        filas: [
          ["Parámetros del modelo", "263 millones"],
          ["Datos recorridos", "6 400 muestras (0,25 épocas)"],
          ["Duración de la prueba", "≈ 1 minuto"],
          ["Velocidad de entrenamiento", "≈ 4,3 pasos por segundo"],
          ["Memoria de GPU utilizada", "4,95 GB"],
          ["Espacio por punto de control (checkpoint)", "3,0 GB"],
          ["Tiempo estimado para 200 000 pasos", "≈ 13 horas"]
        ]
      }
    ],
    evidencias: [
      {
        items: [
          { texto: "Repositorio del proyecto", url: "https://github.com/V01D-Szp/Tesis_IL" },
          { texto: "Integración del entorno de entrenamiento", url: "https://github.com/V01D-Szp/Tesis_IL/commit/996ed2d" },
          { texto: "Bitácora de avances del proyecto", url: "https://v01d-szp.github.io/Tesis_IL/" }
        ]
      }
    ]
  },
  {
    id: "2026-11-16",
    fechas: "16 – 20 de noviembre",
    titulo: "Viabilidad de ACT y evaluación de las políticas en simulación",
    resumen: "Entrenamiento de prueba de ACT, evaluación en simulación de ACT y Diffusion Policy con tasa de éxito, e implementación del cálculo con intervalo de Wilson.",
    introduccion: "Validación del entrenamiento de las dos políticas seleccionadas y del proceso de evaluación que se aplicará a las demostraciones de teleoperación.",
    actividades: [
      "Prueba de viabilidad técnica del entrenamiento de ACT con el dataset público ALOHA (transferencia de un cubo entre dos brazos); el error de entrenamiento se redujo de 28,19 a 3,64 y se compararon los recursos de cómputo con Diffusion Policy.",
      "Evaluación en simulación del desempeño de las dos políticas seleccionadas en sus tareas de referencia, con modelos publicados por LeRobot adaptados a la versión del entorno, para validar el proceso de evaluación que se aplicará a las demostraciones de teleoperación: ACT alcanzó 72 % de éxito en ALOHA (36 de 50 episodios) y Diffusion Policy 58 % en PushT (29 de 50).",
      "Implementación del cálculo de la tasa de éxito con intervalo de confianza de Wilson al 95 % y de la clasificación de fallos por etapa alcanzada, validado con los resultados de la evaluación."
    ],
    resultados: [
      "Se validó el entrenamiento de las dos políticas seleccionadas y el proceso de evaluación que se aplicará a las políticas entrenadas con las demostraciones de teleoperación.",
      {
        titulo: "Viabilidad técnica del entrenamiento (prueba de 200 pasos)",
        encabezados: ["Medida", "ACT (ALOHA)", "Diffusion Policy (PushT)"],
        filas: [
          ["Demostraciones del dataset", "50", "206"],
          ["Parámetros del modelo", "52 millones", "263 millones"],
          ["Velocidad de entrenamiento", "≈ 7,5 pasos/s (lotes de 8)", "≈ 4,3 pasos/s (lotes de 32)"],
          ["Memoria de GPU utilizada", "2,1 GB", "4,95 GB"],
          ["Espacio por punto de control (checkpoint)", "0,59 GB", "3,0 GB"],
          ["Error de entrenamiento (paso 20 → paso 200)", "28,19 → 3,64", "1,091 → 0,089"],
          ["Tiempo estimado de un entrenamiento completo", "≈ 3,5–4 h (100 000 pasos)", "≈ 13 h (200 000 pasos)"]
        ]
      },
      { lectura: "Ambas políticas caben en el equipo de entrenamiento. ACT, política principal del proyecto, requiere cerca de una quinta parte de los parámetros y del almacenamiento de Diffusion Policy. Los valores de error no son comparables entre políticas, ya que cada una lo calcula de forma distinta." },
      {
        titulo: "Tasa de éxito en simulación (50 episodios por política)",
        encabezados: ["Política", "Tarea", "Éxitos", "Tasa de éxito", "Intervalo de Wilson (95 %)"],
        filas: [
          ["ACT", "ALOHA, transferencia de un cubo entre dos brazos", "36 de 50", "72 %", "58,3 % – 82,5 %"],
          ["Diffusion Policy", "PushT, desplazamiento de una pieza en T hasta el objetivo", "29 de 50", "58 %", "44,2 % – 70,6 %"]
        ]
      },
      { lectura: "El intervalo de Wilson indica el rango que contiene la tasa de éxito real con un 95 % de confianza. Al tratarse de tareas distintas, estas tasas no permiten comparar las políticas entre sí; dicha comparación se realizará con las demostraciones y escenarios propios del proyecto." },
      {
        titulo: "Clasificación de los fallos de ACT según la etapa alcanzada",
        encabezados: ["Etapa máxima alcanzada", "Descripción", "Fallos", "Categoría del protocolo"],
        filas: [
          ["0", "La pinza no alcanzó el cubo", "1", "No llegada"],
          ["1", "La pinza tocó el cubo sin separarlo de la mesa", "3", "Fallo de agarre"],
          ["2", "El cubo se separó de la mesa, al menos de forma momentánea, sin completarse la transferencia", "10", "Fallo de agarre o durante el traslado"]
        ]
      },
      { lectura: "La etapa se obtiene de la recompensa que asigna el simulador. La etapa 2 incluye separaciones momentáneas del cubo respecto a la mesa, por lo que no distingue por sí sola un agarre inestable de una caída durante el traslado. Para el protocolo de la tesis se definirán criterios observables propios, como la altura mínima de levantamiento y su permanencia, que permitan esa distinción." },
      {
        titulo: "Precisión de la tasa de éxito según el número de intentos (intervalo de Wilson, 95 %)",
        encabezados: ["Intentos", "Éxitos", "Tasa", "Intervalo"],
        filas: [
          ["20 (un objeto)", "16", "80 %", "58,4 % – 91,9 %"],
          ["20 (un objeto)", "12", "60 %", "38,7 % – 78,1 %"],
          ["80 (cuatro objetos de una misma condición)", "64", "80 %", "70,0 % – 87,3 %"],
          ["80 (cuatro objetos de una misma condición)", "48", "60 %", "49,0 % – 70,0 %"]
        ]
      },
      { lectura: "Con 20 intentos por objeto, los intervalos correspondientes a 80 % y 60 % se superponen, por lo que ambos resultados no pueden distinguirse estadísticamente. Al agrupar los cuatro objetos de cada condición, los intervalos se separan. Este resultado se tendrá en cuenta para definir el criterio de aceptación del protocolo experimental." }
    ],
    evidencias: [
      {
        grupo: "Datos de los resultados",
        items: [
          { texto: "Resumen estadístico de la evaluación de ACT", url: "evidencias/2026-11-16/resumen_act_aloha.json" },
          { texto: "Resumen estadístico de la evaluación de Diffusion Policy", url: "evidencias/2026-11-16/resumen_diffusion_pusht.json" }
        ]
      },
      {
        grupo: "Modelos y datasets de referencia",
        items: [
          { texto: "Dataset ALOHA de transferencia de cubo (versión v3.0)", url: "https://huggingface.co/datasets/lerobot/aloha_sim_transfer_cube_human" },
          { texto: "Modelo de referencia de ACT publicado por LeRobot", url: "https://huggingface.co/lerobot/act_aloha_sim_transfer_cube_human" },
          { texto: "Modelo de referencia de Diffusion Policy publicado por LeRobot", url: "https://huggingface.co/lerobot/diffusion_pusht" }
        ]
      }
    ],
    notaMedios: "Los videos corresponden a casos representativos seleccionados entre los diez primeros episodios grabados de cada evaluación: para cada política, el intento exitoso más limpio y un intento fallido del tipo más frecuente. El desempeño de cada política se determina con la tasa de éxito sobre los 50 episodios.",
    medios: [
      { tipo: "video", archivo: "evidencias/2026-11-16/act_aloha_exito.mp4", descripcion: "Intento exitoso de ACT, con la transferencia del cubo entre los dos brazos (episodio 3)." },
      { tipo: "video", archivo: "evidencias/2026-11-16/act_aloha_fallo.mp4", descripcion: "Intento fallido de ACT, en el que la pinza alcanza el cubo sin lograr levantarlo de la mesa (episodio 0)." },
      { tipo: "video", archivo: "evidencias/2026-11-16/diffusion_pusht_exito.mp4", descripcion: "Intento exitoso de Diffusion Policy, con la pieza en T ubicada sobre el objetivo (episodio 3)." },
      { tipo: "video", archivo: "evidencias/2026-11-16/diffusion_pusht_fallo.mp4", descripcion: "Intento fallido de Diffusion Policy, en el que la pieza queda cerca del objetivo sin alcanzar la cobertura exigida (episodio 1)." }
    ]
  }
];
