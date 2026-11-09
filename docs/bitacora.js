// Bitácora de avances del proyecto.
// Para registrar una semana nueva, agregar un bloque al final de SEMANAS.
// Campos opcionales: resultados, evidencias, medios, cumplimiento.

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
    cumplimiento: "Cumple en alto grado",
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
    cumplimiento: "Cumple plenamente",
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
    cumplimiento: "Cumple plenamente",
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
    cumplimiento: "Cumple plenamente",
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
  }
];
