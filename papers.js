// Add papers here, newest first. Leave links empty or omit optional fields.
// Copy this example into the array and replace every example value:
// {
//   id: "unique-paper-id",
//   title: "Your paper title",
//   authors: "Oankar Patil, Coauthor Name",
//   venue: "Conference / journal / preprint",
//   year: "2026",
//   abstract: "Your full abstract. Use \\n for a new paragraph.",
//   links: [
//     { label: "Paper", url: "https://example.org/paper" },
//     { label: "Code", url: "https://github.com/your-account/your-project" },
//     { label: "Project", url: "https://example.org/project" }
//   ]
// }
window.PAPERS = [
    {
   id: "seana",
   title: "Breaking Noise Shortcuts in Self-Supervised Learning via Noise-Aligned View Generation",
   authors: "Oankar R. Patil, May D. Wang",
   venue: "NeurIPS '26 - Main Track",
   year: "2026",
   abstract: "Self-supervised learning (SSL) is increasingly applied to scientific imaging domains, such as microscopy, where labels are scarce but noisy data is abundant. These domains exhibit significant signal-dependent noise, which can create a representational shortcut: since both augmented views derive from the same noisy image, the encoder can boost view agreement by also encoding noise patterns rather than semantic content. To enable noise-robust representation learning without knowledge of underlying noise models, we introduce Self-Aligned Noise Augmentation (SEANA), a drop-in module that generates noise-aware SSL views. SEANA learns an invertible variance-stabilizing transform (VST) from noisy data, then estimates the clean signal and resamples independent noise in learned VST space, requiring no clean targets, no dataset-specific denoiser training or use at inference, and no changes to the SSL objective or encoder. On CIFAR-10 and ImageNet-100 under synthetic Gaussian, Poisson–Gaussian, and multiplicative noise, SEANA improves clean-test linear-probe accuracy across contrastive/non-contrastive SSL methods, indicating higher-quality representations. On real fluorescence imaging, SEANA improves Jurkat cell-cycle stage classification by up to 28.6pp over standard SSL and 27.5pp over denoiser-preprocessed baselines. In both settings, SEANA outperforms the denoiser-preprocessed SSL pipeline, demonstrating that learned VST-space noise-aligned resampling yields more robust representations than denoising alone.",
   links: [
     { label: "Paper", url: "incoming" },
     { label: "Code", url: "incoming" },
     { label: "Project", url: "incoming" }
   ]
 }
];
