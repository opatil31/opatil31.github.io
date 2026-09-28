// Add papers here, newest first. Leave links empty or omit optional fields.
// Copy this example into the array and replace every example value:
// {
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

 {
   title: "Breaking Noise Shortcuts in Self-Supervised Learning via Noise-Aligned View Generation",
   authors: "Oankar R. Patil, Keenan Hom, May D. Wang, Daniel Drane",
   venue: "MIDL (Medical Imaging with Deep Learning) '26 - Short Paper Track",
   year: "2026",
   abstract: "Data-driven subtyping of Alzheimer's disease (AD) using conditional variational autoencoders (cVAEs) has identified metabolic subtypes from FDG-PET, but existing approaches provide no insight into which inter-regional metabolic relationships define each subtype. We introduce a parcellated cVAE with a Differentiable Cell Complex Module (DCM) that learns higher-order topology over atlas-parcellated brain regions, enabling simultaneous subtype discovery and interpretable connectivity mapping. Applied to 716 AD subjects from ADNI, our model identifies two severity-matched subtypes with anti-correlated connectivity (r=-0.81), distinct cognitive profiles (p<0.001), and differential CSF tau (p=0.0008, corrected), corresponding to posterior-cortical and limbic AD variants.",
   links: [
     { label: "Paper", url: "https://openreview.net/forum?id=Izi7kUr1Ya&referrer=%5Bthe%20profile%20of%20Oankar%20R.%20Patil%5D(%2Fprofile%3Fid%3D~Oankar_R._Patil1)" },
   ]
 }
];
