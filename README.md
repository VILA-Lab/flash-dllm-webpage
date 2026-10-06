# Flash-dLLM project page

Static page for [Flash-dLLM](https://github.com/VILA-Lab/Flash-dLLM) (arXiv 2609.26796). No build step.

## Preview

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000. On a remote machine, forward port 8000 first (in VS Code: the Ports panel).

## Publish

Push this folder to a GitHub repository and enable GitHub Pages for the repository root.

## Files

- `index.html`, `assets/css/style.css`, `assets/js/main.js`: the page.
- `assets/img/`: figures cropped from the paper PDF (`docs/Flash_dLLM.pdf` in the Flash-dLLM repository), the
  Flash-dLLM mark (`flash-dllm-logo.svg`) and the MBZUAI logo (`mbzuai_logo.png`, 545 px wide, copied from
  Wikipedia; replace it with the official file from the university brand kit).
- `assets/video/`: the two demo videos and their poster frames. They were rendered with `demo/render_video.py`
  in the Flash-dLLM repository from traces recorded by `demo/record_trace.py`.

## Demo video settings

LLaDA-1.5 on one NVIDIA RTX 6000 Ada. The first 8 GSM8K test questions with 5-shot prompts. Every method decodes
4 questions per forward pass, with generation length 512, block length 32 and confidence threshold 0.9.
Flash-dLLM uses Flash-Verify with `gamma=0.8`, `track_num=2` and `mask_num=2`. Fast-dLLM uses its dual cache.
LLaDA is the sampler from the Fast-dLLM repository with no cache and one token per step.
