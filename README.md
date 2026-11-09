# Estrategia de Aprendizaje por Imitación para la Manipulación de Objetos con una Mano Robótica Multidedo

Caso de estudio con objetos estipulados por el estándar Yale-CMU-Berkeley (YCB).

Universidad Santo Tomás · Facultad de Ingeniería Electrónica · Grupo de Estudio y Desarrollo en Robótica (GED)

**Bitácora de avances:** [v01d-szp.github.io/Tesis_IL](https://v01d-szp.github.io/Tesis_IL/)

## Descripción

Este repositorio reúne el código, la configuración y la documentación empleados para desarrollar y evaluar una estrategia de control basada en Aprendizaje por Imitación (IL, *Imitation Learning*) para el agarre y desplazamiento de objetos del estándar YCB mediante una mano robótica multidedo.

El desarrollo se realiza en simulación: las demostraciones se recolectan mediante teleoperación guiada y las políticas entrenadas se evalúan en el mismo entorno simulado.

## Enfoque metodológico

| Elemento | Elección | Justificación |
|---|---|---|
| Rama de IL | Clonación de comportamiento (BC, *Behavior Cloning*) *offline* | Aprende de forma supervisada a partir de demostraciones grabadas, sin requerir una función de recompensa ni interacción con el entorno durante el entrenamiento |
| Política principal | ACT (*Action Chunking with Transformers*) | Predice secuencias cortas de acciones, lo que reduce la acumulación de errores (*covariate shift*) con un número reducido de demostraciones |
| Política de comparación | Diffusion Policy | Modela la distribución completa de acciones y representa la multimodalidad de las demostraciones humanas |
| Simulador | MuJoCo | Motor de física de código abierto empleado para la recolección de demostraciones y la evaluación en lazo cerrado |
| *Framework* | LeRobot | Implementaciones de ACT y Diffusion Policy, formato estándar de datos (LeRobotDataset) y herramientas de entrenamiento y evaluación |

La política recibe como observación imágenes de cámara y el estado articular del brazo y de la mano, y predice posiciones articulares objetivo. El desempeño se mide mediante la tasa de éxito en tareas de agarre y desplazamiento, tanto sobre objetos empleados en el entrenamiento como sobre objetos no incluidos en él.

## Estructura del repositorio

```
Tesis_IL/
├── entrenamiento/     Preparación de datos, entrenamiento y evaluación de políticas
├── teleoperacion/     Teleoperación guiada y grabación de demostraciones en simulación
├── dataset/
│   ├── pruebas/       Datasets públicos de referencia (no versionados)
│   ├── propios/       Demostraciones recolectadas (no versionadas)
│   └── cache/         Archivos temporales de descarga (no versionados)
└── docs/              Página de seguimiento del proyecto (bitácora de avances)
```

Cada componente con código es un proyecto de Python independiente, con su propio entorno y versiones fijadas, para evitar conflictos de dependencias entre ellos. Los componentes intercambian información únicamente a través de `dataset/`.

## Requisitos

| Requisito | Detalle |
|---|---|
| Sistema operativo | Linux (probado en Ubuntu 22.04) |
| Python | 3.12, instalado automáticamente por uv |
| [uv](https://docs.astral.sh/uv/) | Gestor de entornos y dependencias |
| Git | Clonación del repositorio |
| ffmpeg | Lectura de los videos de los datasets |
| GPU | NVIDIA con controlador compatible con CUDA 13, recomendada para el entrenamiento |

## Instalación

```bash
git clone https://github.com/V01D-Szp/Tesis_IL.git
cd Tesis_IL/entrenamiento
uv sync --frozen
cp .env.example .env
```

`uv sync --frozen` crea el entorno del componente con exactamente las versiones registradas en `uv.lock`. El componente de teleoperación se instala de la misma forma desde su carpeta.

### Variables de entorno

En el archivo `.env` de cada componente se ajustan las rutas absolutas según la ubicación del repositorio:

| Variable | Función |
|---|---|
| `HF_HOME` | Caché de Hugging Face dentro de `dataset/cache/` |
| `HF_LEROBOT_HOME` | Ubicación de los datasets en formato LeRobotDataset |
| `HF_HUB_DISABLE_TELEMETRY` | Desactiva el envío de datos de uso |
| `WANDB_MODE` | Desactiva el registro de métricas en servicios externos |
| `MUJOCO_GL` | Motor de renderizado de MuJoCo (`egl` para ejecución sin ventana) |

Los comandos se ejecutan dentro del entorno del componente con:

```bash
uv run --env-file .env <comando>
```

### Verificación

```bash
uv run --env-file .env python -c "import lerobot, torch; print('LeRobot', lerobot.__version__); print('PyTorch', torch.__version__); print('GPU:', torch.cuda.is_available())"
```

### Dependencias del entrenamiento

El entorno del componente de entrenamiento se construyó con:

```bash
uv init --bare --python 3.12 --name entrenamiento
uv python pin 3.12
uv add "lerobot[training,diffusion,pusht,aloha]"
```

| Paquete | Versión |
|---|---|
| Python | 3.12 |
| LeRobot | 0.6.1 |
| PyTorch | 2.11.0 (CUDA 13.0) |
| MuJoCo | 3.8.1 |

| Extra de LeRobot | Función |
|---|---|
| `training` | Dependencias para el entrenamiento de políticas |
| `diffusion` | Dependencias de Diffusion Policy |
| `pusht` | Entorno de simulación PushT |
| `aloha` | Entorno de simulación ALOHA sobre MuJoCo |

## Datasets

Todos los datos se manejan en formato LeRobotDataset: cada episodio corresponde a una demostración completa y contiene, en cada instante, las imágenes de cámara, el estado del robot y la acción ejecutada.

| Dataset | Uso | Versión |
|---|---|---|
| [`lerobot/pusht`](https://huggingface.co/datasets/lerobot/pusht) | Validación del flujo de entrenamiento y evaluación | v3.0 (`b1c3ecbae7f244acc039a3dbc255a00dad1372b9`) |

Los datasets públicos se descargan desde sus repositorios oficiales y la versión exacta de cada uno se registra en `entrenamiento/configs/versiones_datasets.txt`. Las demostraciones recolectadas mediante teleoperación se almacenan en `dataset/propios/` con el mismo formato.

## Reproducibilidad

- Las dependencias de cada componente están fijadas en su archivo `uv.lock`.
- Cada dataset se identifica por repositorio, versión y *commit*.
- Los entornos, datos, cachés y resultados de entrenamiento no se versionan; se reconstruyen o se descargan a partir de la información registrada en este repositorio.

## Referencias

- T. Z. Zhao, V. Kumar, S. Levine y C. Finn, "Learning Fine-Grained Bimanual Manipulation with Low-Cost Hardware", 2023. [arXiv:2304.13705](https://arxiv.org/abs/2304.13705)
- C. Chi *et al.*, "Diffusion Policy: Visuomotor Policy Learning via Action Diffusion", 2023. [arXiv:2303.04137](https://arxiv.org/abs/2303.04137)
- LeRobot, Hugging Face. [github.com/huggingface/lerobot](https://github.com/huggingface/lerobot)
- MuJoCo. [mujoco.org](https://mujoco.org)
- YCB Object and Model Set. [ycbbenchmarks.com](https://www.ycbbenchmarks.com)

## Autores

| Rol | Nombre |
|---|---|
| Autor | |
| Autor | |
| Director | |
| Codirector | |

## Licencia
