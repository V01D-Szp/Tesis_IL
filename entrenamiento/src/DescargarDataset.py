import sys

from huggingface_hub import HfApi
from lerobot.datasets.lerobot_dataset import LeRobotDataset

REPO_ID = sys.argv[1] if len(sys.argv) > 1 else "lerobot/pusht"

# Versiones publicadas del dataset (etiqueta -> commit exacto)
refs = HfApi().list_repo_refs(REPO_ID, repo_type="dataset")
print(f"Dataset: {REPO_ID}")
print("Versiones publicadas:")
for tag in refs.tags:
    print(f"  {tag.name} -> {tag.target_commit}")

# Descarga la versión compatible con la LeRobot instalada
ds = LeRobotDataset(REPO_ID)

print("\nResumen:")
print(f"  Formato:   {ds.meta.info.codebase_version}")
print(f"  Episodios: {ds.num_episodes}")
print(f"  Frames:    {ds.num_frames}")
print(f"  FPS:       {ds.fps}")
print(f"  Ubicación: {ds.root}")
