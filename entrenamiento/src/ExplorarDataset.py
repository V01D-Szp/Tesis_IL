"""Explora la estructura de un dataset de LeRobot."""
from typing import Any, cast
import sys
from pathlib import Path

import numpy as np
from PIL import Image
from lerobot.datasets.lerobot_dataset import LeRobotDataset

REPO_ID = sys.argv[1] if len(sys.argv) > 1 else "lerobot/pusht"
SALIDA = Path("outputs/exploracion")
SALIDA.mkdir(parents=True, exist_ok=True)


def campo(obj, clave):
    """Lee un campo tanto si es diccionario como si es objeto."""
    return obj[clave] if isinstance(obj, dict) else getattr(obj, clave)


ds = LeRobotDataset(REPO_ID)

# 1. Qué se guarda en cada paso de tiempo
print("=== CARACTERÍSTICAS ===")
for nombre, info in ds.meta.features.items():
    print(f"  {nombre:22s} tipo={campo(info, 'dtype'):8s} forma={campo(info, 'shape')}")

# 2. Episodios (cada uno es una demostración)
largos = np.array(list(ds.meta.episodes["length"]))
print("\n=== EPISODIOS ===")
print(f"  Cantidad: {ds.num_episodes}")
print(f"  Frames por episodio: mín={largos.min()}  media={largos.mean():.1f}  máx={largos.max()}")
print(f"  Duración media: {largos.mean() / ds.fps:.1f} s a {ds.fps} FPS")

# 3. Contenido de un paso de tiempo
muestra = cast(dict[str, Any], ds[0])
print("\n=== MUESTRA (frame 0) ===")
for k, v in muestra.items():
    forma = tuple(v.shape) if hasattr(v, "shape") else type(v).__name__
    print(f"  {k:22s} {forma}")
print(f"  Estado: {muestra['observation.state'].tolist()}")
print(f"  Acción: {muestra['action'].tolist()}")

# 4. Rangos de estado y acción en todo el dataset
print("\n=== RANGOS ===")
stats = ds.meta.stats
assert stats is not None, "El dataset no tiene estadísticas"
for clave in ["observation.state", "action"]:
    s = stats[clave]
    print(f"  {clave}: mín={np.round(np.asarray(s['min']), 1)}  máx={np.round(np.asarray(s['max']), 1)}")
# 5. Imagen que ve la política en el primer frame
img = muestra["observation.image"].permute(1, 2, 0).numpy()
img = Image.fromarray((img * 255).astype(np.uint8)).resize((384, 384), Image.Resampling.NEAREST)
img.save(SALIDA / "frame_0.png")
print(f"\nImagen guardada en {SALIDA / 'frame_0.png'}")
