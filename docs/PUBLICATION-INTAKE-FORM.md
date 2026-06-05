# Publication Intake Form

Use this file to complete missing publication details before importing into `content/publications/`.

Fields:

- `title`
- `authors`
- `year`
- `venue`
- `publication_type`
- `abstract`
- `research_themes`
- `related_projects`
- `thumbnail`
- `figure`
- `media_type`
- `paper_url`
- `code_url`
- `demo_url`
- `doi_url`
- `featured`
- `status`

Valid `publication_type` values: `journal`, `conference`, `preprint`, `workshop`, `poster`, `thesis`, `other`.

Valid `media_type` values: `image`, `gif`, `none`.

---

title: Aligning What You Separate: Denoised Patch Mixing for Source-Free Domain Adaptation in Medical Image Segmentation
authors: Quang-Khai Bui-Tran, Thanh-Huy Nguyen, Hoang-Thien Nguyen, Ba-Thinh Lam, Nguyen Lan Vi Vu, Phat K. Huynh, Ulas Bagci, Min Xu
year: 2026
venue: ICASSP 2026
publication_type: conference
abstract: Source-Free Domain Adaptation (SFDA) is emerging as a compelling solution for medical image segmentation under privacy constraints, yet current approaches often ignore sample difficulty and struggle with noisy supervision under domain shift. We present a new SFDA framework that leverages Hard Sample Selection and Denoised Patch Mixing to progressively align target distributions. First, unlabeled images are partitioned into reliable and unreliable subsets through entropy-similarity analysis, allowing adaptation to start from easy samples and gradually incorporate harder ones. Next, pseudo-labels are refined via Monte Carlo-based denoising masks, which suppress unreliable pixels and stabilize training. Finally, intra- and inter-domain objectives mix patches between subsets, transferring reliable semantics while mitigating noise. Experiments on benchmark datasets show consistent gains over prior SFDA and UDA methods, delivering more accurate boundary delineation and achieving state-of-the-art Dice and ASSD scores. Our study highlights the importance of progressive adaptation and denoised supervision for robust segmentation under domain shift.
research_themes:
related_projects:
thumbnail:
figure:
media_type:
paper_url:
code_url:
demo_url:
doi_url:
featured:
status: accepted

---

title: Domain-invariant Mixed-domain Semi-supervised Medical Image Segmentation with Clustered Maximum Mean Discrepancy Alignment
authors: Ba-Thinh Lam, Thanh-Huy Nguyen, Hoang-Thien Nguyen, Quang-Khai Bui-Tran, Nguyen Lan Vi Vu, Phat K. Huynh, Ulas Bagci, Min Xu
year: 2026
venue: ICASSP 2026
publication_type: conference
abstract: Deep learning has shown remarkable progress in medical image semantic segmentation, yet its success heavily depends on large-scale expert annotations and consistent data distributions. In practice, annotations are scarce, and images are collected from multiple scanners or centers, leading to mixed-domain settings with unknown domain labels and severe domain gaps. Existing semi-supervised or domain adaptation approaches typically assume either a single domain shift or access to explicit domain indices, which rarely hold in real-world deployment. In this paper, we propose a domain-invariant mixed-domain semi-supervised segmentation framework that jointly enhances data diversity and mitigates domain bias. A Copy-Paste Mechanism (CPM) augments the training set by transferring informative regions across domains, while a Cluster Maximum Mean Discrepancy (CMMD) block clusters unlabeled features and aligns them with labeled anchors via an MMD objective, encouraging domain-invariant representations. Integrated within a teacher-student framework, our method achieves robust and precise segmentation even with very few labeled examples and multiple unknown domain discrepancies. Experiments on Fundus and M&Ms benchmarks demonstrate that our approach consistently surpasses semi-supervised and domain adaptation methods, establishing a potential solution for mixed-domain semi-supervised medical image segmentation.
research_themes:
related_projects:
thumbnail:
figure:
media_type:
paper_url:
code_url:
demo_url:
doi_url:
featured:
status: accepted

---

title: LPD: Learnable Prototypes with Diversity Regularization for Weakly Supervised Histopathology Segmentation
authors: Khang Le, Anh Mai Vu, Thi Kim Trang Vo, Ha Thach, Ngoc Bui Lam Quang, Thanh-Huy Nguyen, Minh H. N. Le, Zhu Han, Chandra Mohan, Hien Van Nguyen
year: 2026
venue: ISBI 2026
publication_type: conference
abstract: Weakly supervised semantic segmentation (WSSS) in histopathology reduces pixel-level labeling by learning from image-level labels, but it is hindered by inter-class homogeneity, intra-class heterogeneity, and CAM-induced region shrinkage (global pooling-based class activation maps whose activations highlight only the most distinctive areas and miss nearby class regions). Recent works address these challenges by constructing a clustering prototype bank and then refining masks in a separate stage; however, such two-stage pipelines are costly, sensitive to hyperparameters, and decouple prototype discovery from segmentation learning, limiting their effectiveness and efficiency. We propose a cluster-free, one-stage learnable-prototype framework with diversity regularization to enhance morphological intra-class heterogeneity coverage. Our approach achieves state-of-the-art (SOTA) performance on BCSS-WSSS, outperforming prior methods in mIoU and mDice. Qualitative segmentation maps show sharper boundaries and fewer mislabels, and activation heatmaps further reveal that, compared with clustering-based prototypes, our learnable prototypes cover more diverse and complementary regions within each class, providing consistent qualitative evidence for their effectiveness.
research_themes:
related_projects:
thumbnail:
figure:
media_type:
paper_url:
code_url:
demo_url:
doi_url:
featured:
status: accepted

---

title: Scribble-Supervised Medical Image Segmentation with Dynamic Teacher Switching and Hierarchical Consistency
authors: Thanh-Huy Nguyen, Hoang-Loc Cao, Dat T. Chung, Mai-Anh Vu, Thanh-Minh Nguyen, Minh Le, Phat K. Huynh, Ulas Bagci
year: 2026
venue: ISBI 2026
publication_type: conference
abstract: Scribble-supervised methods have emerged to mitigate the prohibitive annotation burden in medical image segmentation. However, the inherent sparsity of these annotations introduces significant ambiguity, which results in noisy pseudo-label propagation and hinders the learning of robust anatomical boundaries. To address this challenge, we propose SDT-Net, a novel dual-teacher, single-student framework designed to maximize supervision quality from these weak signals. Our method features a Dynamic Teacher Switching (DTS) module to adaptively select the most reliable teacher. This selected teacher then guides the student via two synergistic mechanisms: high-confidence pseudo-labels, refined by a Pick Reliable Pixels (PRP) mechanism, and multi-level feature alignment, enforced by a Hierarchical Consistency (HiCo) module. Extensive experiments on the ACDC and MSCMRseg datasets demonstrate that SDT-Net achieves state-of-the-art performance, producing more accurate and anatomically plausible segmentation.
research_themes:
related_projects:
thumbnail:
figure:
media_type:
paper_url:
code_url:
demo_url:
doi_url:
featured:
status: accepted

---

title: From Specialist to Generalist: Unlocking SAM's Learning Potential on Unlabeled Medical Images
authors: Vi Vu, Thanh-Huy Nguyen, Tien-Thinh Nguyen, Ba-Thinh Lam, Hoang-Thien Nguyen, Tianyang Wang, Xingjian Li, Min Xu
year: 2026
venue: ISBI 2026
publication_type: conference
abstract: Foundation models like the Segment Anything Model (SAM) show strong generalization, yet adapting them to medical images remains difficult due to domain shift, scarce labels, and the inability of Parameter-Efficient Fine-Tuning (PEFT) to exploit unlabeled data. While conventional models like U-Net excel in semi-supervised medical learning, their potential to assist a PEFT SAM has been largely overlooked. We introduce SC-SAM, a specialist-generalist framework where U-Net provides point-based prompts and pseudo-labels to guide SAM's adaptation, while SAM serves as a powerful generalist supervisor to regularize U-Net. This reciprocal guidance forms a bidirectional co-training loop that allows both models to effectively exploit the unlabeled data. Across prostate MRI and polyp segmentation benchmarks, our method achieves state-of-the-art results, outperforming other existing semi-supervised SAM variants and even medical foundation models like MedSAM, highlighting the value of specialist-generalist cooperation for label-efficient medical image segmentation. Our code is available at github
research_themes:
related_projects:
thumbnail:
figure:
media_type:
paper_url:
code_url:
demo_url:
doi_url:
featured:
status: accepted

---

title: Adaptive Knowledge Transferring with Switching Dual-Student Framework for Semi-Supervised Medical Image Segmentation
authors: Hoang-Thien Nguyen, Thanh-Huy Nguyen, Ba-Thinh Lam, Vi Vu, Bach X. Nguyen, Jianhua Xing, Tianyang Wang, Xingjian Li, Min Xu
year: 2026
venue: Pattern Recognition 
publication_type: journal
abstract: Teacher-student frameworks have emerged as a leading approach in semi-supervised medical image segmentation, demonstrating strong performance across various tasks. However, the learning effects are still limited by the strong correlation and unreliable knowledge transfer process between teacher and student networks. To overcome this limitation, we introduce a novel switching Dual-Student architecture that strategically selects the most reliable student at each iteration to enhance dual-student collaboration and prevent error reinforcement. We also introduce a strategy of Loss-Aware Exponential Moving Average to dynamically ensure that the teacher absorbs meaningful information from students, improving the quality of pseudo-labels. Our plug-and-play framework is extensively evaluated on 3D medical image segmentation datasets, where it outperforms state-of-the-art semi-supervised methods, demonstrating its effectiveness in improving segmentation accuracy under limited supervision.
research_themes:
related_projects:
thumbnail:
figure:
media_type:
paper_url:
code_url:
demo_url:
doi_url:
featured:
status: accepted

---

title: UP2D: Uncertainty-aware progressive pseudo-label denoising for source-free domain adaptive medical image segmentation
authors: Thanh-Huy Nguyen, Quang-Khai Bui-Tran, Manh D. Ho, Thinh B. Lam b, Vi Vu, Hoang-Thien Nguyen, Phat Huynh, Ulas Bagci
year: 2025
venue: Neurocomputing
publication_type: journal
abstract:Medical image segmentation models face severe performance drops under domain shifts, especially when data sharing constraints prevent access to source images. We present a novel uncertainty-aware progressive pseudo-label denoising (UP2D) framework for source-free domain adaptation (SFDA), designed to mitigate noisy pseudo-labels and class imbalance during adaptation. UP2D integrates three key components: (i) a Refined Prototype Filtering module that suppresses uninformative regions and constructs reliable class prototypes to denoise pseudo-labels, (ii) an uncertainty-guided EMA (UG-EMA) strategy that selectively updates the teacher model based on spatially weighted boundary uncertainty, and (iii) a quantile-based entropy minimization scheme that focuses learning on ambiguous regions while avoiding overconfidence on easy pixels. This single-stage student–teacher framework progressively improves pseudo-label quality and reduces confirmation bias. Extensive experiments on three challenging retinal fundus benchmarks demonstrate that UP2D achieves state-of-the-art performance across both standard and open-domain settings, outperforming prior UDA and SFDA approaches while maintaining superior boundary precision.
research_themes:
related_projects:
thumbnail:
figure:
media_type:
paper_url:
code_url:
demo_url:
doi_url:
featured:
status: accepted

---

title: Modality-Specific Enhancement and Complementary Fusion for Semi-Supervised Multi-Modal Brain Tumor Segmentation
authors: Tien-Dat Chung, Ba-Thinh Lam, Thanh-Huy Nguyen, Thien Nguyen, Nguyen Lan Vi Vu, Hoang-Loc Cao, Phat Kim Huynh, Min Xu
year: 2026
venue: AAAI 2026 Bridge - AI for Medicine and Healthcare
publication_type: poster
abstract: Semi-supervised learning (SSL) has become a promising direction for medical image segmentation, enabling models to learn from limited labeled data alongside abundant unlabeled samples. However, existing SSL approaches for multi-modal medical imaging often struggle to exploit the complementary information between modalities due to semantic discrepancies and misalignment across MRI sequences. To address this, we propose a novel semi-supervised multi-modal framework that explicitly enhances modality-specific representations and facilitates adaptive cross-modal information fusion. Specifically, we introduce a Modality-specific Enhancing Module (MEM) to strengthen semantic cues unique to each modality via channel-wise attention, and a learnable Complementary Information Fusion (CIF) module to adaptively exchange complementary knowledge between modalities. The overall framework is optimized using a hybrid objective combining supervised segmentation loss and cross-modal consistency regularization on unlabeled data. Extensive experiments on the BraTS 2019 (HGG subset) demonstrate that our method consistently outperforms strong semi-supervised and multi-modal baselines under 1\%, 5\%, and 10\% labeled data settings, achieving significant improvements in both Dice and Sensitivity scores. Ablation studies further confirm the complementary effects of our proposed MEM and CIF in bridging cross-modality discrepancies and improving segmentation robustness under scarce supervision.
research_themes:
related_projects:
thumbnail:
figure:
media_type:
paper_url:
code_url:
demo_url:
doi_url:
featured:
status: accepted

---

title: DuetMatch: Harmonizing semi-supervised brain MRI segmentation via decoupled branch optimization
authors: Thanh-Huy Nguyen, Hoang-Thien Nguyen, Vi Vu, Ba-Thinh Lam, Phat Huynh, Tianyang Wang, Xingjian Li, Ulas Bagci, Min Xu
year: 2025
venue: Computerized Medical Imaging and Graphics
publication_type: journal
abstract: The limited availability of annotated data in medical imaging makes semi-supervised learning increasingly appealing for its ability to learn from imperfect supervision. Recently, teacher-student frameworks have gained popularity for their training benefits and robust performance. However, jointly optimizing the entire network can hinder convergence and stability, especially in challenging scenarios. To address this for medical image segmentation, we propose DuetMatch, a novel dual-branch semi-supervised framework with asynchronous optimization, where each branch optimizes either the encoder or decoder while keeping the other frozen. To improve consistency under noisy conditions, we introduce Decoupled Dropout Perturbation, enforcing regularization across branches. We also design Pairwise CutMix Cross-Guidance to enhance model diversity by exchanging pseudo-labels through augmented input pairs. To mitigate confirmation bias from noisy pseudo-labels, we propose Consistency Matching, refining labels using stable predictions from frozen teacher models. Extensive experiments on benchmark brain MRI segmentation datasets, including ISLES2022 and BraTS, show that DuetMatch consistently outperforms state-of-the-art methods, demonstrating its effectiveness and robustness across diverse semi-supervised segmentation scenarios.
research_themes:
related_projects:
thumbnail:
figure:
media_type:
paper_url:
code_url:
demo_url:
doi_url:
featured:
status: accepted

---

title: OASIS-Net: An Obstetric Adversarial Semi-Supervised Image Segmentation Network for Cervical and Fetal Head Ultrasound Imaging
authors: Minh Huu Nhat Le, Tran Quoc Khanh Le, Thanh-Huy Nguyen, Dang Nguyen, Hien Quang Nguyen, Nhi Huu Hanh Le, Kien Dang Nguyen, Hien Quang Kha, Phat Ky Nguyen, Hoai Huu Le, Han Hong Huynh, Dang-Manh Ho, Thanh-Minh Nguyen, Quan Nguyen, Min Xu, Phat K Huynh, Nguyen Quoc Khanh Le
year: 2025
venue: IEEE JBHI
publication_type: journal
abstract: Accurate obstetric ultrasound segmentation is hampered by speckle noise and scarce annotations. We propose OASIS-Net, a dual-space adversarial semi-supervised framework that trains a single DeepLabV3$+$ backbone by minimizing one unified consistency loss. The loss couples input-space adversaries (iterative FGSM with $K=3$ steps, $\epsilon =4/255$) and weight-space gradient-aligned perturbations (DGAP, weight scale $=0.5$) whose influence grows with a sigmoid ramp ($T_{\text{ramp}}=20$, $\alpha _{\max }=1.0$). Pseudo-labels are accepted with a confidence threshold of 0.95 and the unlabeled loss weight is 1.0. We evaluate OASIS-Net on two public obstetric benchmarks: FUGC (50 labeled, 450 unlabeled) and PSFH (5,101 frames, 70% unlabeled). Using 20% of labels, the method attains Dice = 96.53% and HD$_{95}$ = 3.86 px on FUGC, and Dice = 97.16% and HD$_{95}$ = 2.34 px on PSFH. Ablation shows that removing either perturbation stream reduces Dice by up to 1.8 percentage points. The trained model runs at 18.96 frames s$^{-1}$ on a single RTX 4060 Ti and produces high-precision masks that enable automated cervical-length and angle-of-progression measurements for objective obstetric screening and intrapartum monitoring. These results demonstrate that jointly enforcing input- and parameter-space adversarial consistency yields a label-efficient, robust solution for obstetric ultrasound segmentation and supports real-time clinical use.
research_themes:
related_projects:
thumbnail:
figure:
media_type:
paper_url:
code_url:
demo_url:
doi_url:
featured:
status: accepted

---

title: Contrastive Integrated Gradients: A Feature Attribution-Based Method for Explaining Whole Slide Image Classification
authors: Anh Mai Vu, Tuan L. Vo, Ngoc Lam Quang Bui, Nam Nguyen Le Binh, Akash Awasthi, Huy Quoc Vo, Thanh-Huy Nguyen, Zhu Han, Chandra Mohan, Hien Van Nguyen
year: 2026
venue: WACV 2026
publication_type: conference
abstract: Interpretability is essential in Whole Slide Image (WSI) analysis for computational pathology, where understanding model predictions helps build trust in AI-assisted diagnostics. While Integrated Gradients (IG) and related attribution methods have shown promise, applying them directly to WSIs introduces challenges due to their high-resolution nature. These methods capture model decision patterns but may overlook class-discriminative signals that are crucial for distinguishing between tumor subtypes. In this work, we introduce Contrastive Integrated Gradients (CIG), a novel attribution method that enhances interpretability by computing contrastive gradients in logit space. First, CIG highlights class-discriminative regions by comparing feature importance relative to a reference class, offering sharper differentiation between tumor and non-tumor areas. Second, CIG satisfies the axioms of integrated attribution, ensuring consistency and theoretical soundness. Third, we propose two attribution quality metrics, MIL-AIC and MIL-SIC, which measure how predictive information and model confidence evolve with access to salient regions, particularly under weak supervision. We validate CIG across three datasets spanning distinct cancer types: CAMELYON16 (breast cancer metastasis in lymph nodes), TCGA-RCC (renal cell carcinoma), and TCGA-Lung (lung cancer). Experimental results demonstrate that CIG yields more informative attributions both quantitatively, using MIL-AIC and MIL-SIC, and qualitatively, through visualizations that align closely with ground truth tumor regions, underscoring its potential for interpretable and trustworthy WSI-based diagnostics
research_themes:
related_projects:
thumbnail:
figure:
media_type:
paper_url:
code_url:
demo_url:
doi_url:
featured:
status: accepted

---

title: Describe anything model for visual question answering on text-rich images
authors: Yen-Linh Vu, Dinh-Thang Duong, Truong-Binh Duong, Anh-Khoi Nguyen, Thanh-Huy Nguyen, Le Thien Phuc Nguyen, Jianhua Xing, Xingjian Li, Tianyang Wang, Ulas Bagci, Min Xu
year: 2025
venue: ICCV 2025 Workshop - VisionDoc
publication_type: poster
abstract: Recent progress has been made in region-aware vision-language modeling, particularly with the emergence of the Describe Anything Model (DAM). DAM is capable of generating detailed descriptions of any specific image areas or objects without the need for additional localized image-text alignment supervision. We hypothesize that such region-level descriptive capability is beneficial for the task of Visual Question Answering (VQA), especially in challenging scenarios involving images with dense text. In such settings, the fine-grained extraction of textual information is crucial to producing correct answers. Motivated by this, we introduce DAM-QA, a framework with a tailored evaluation protocol, developed to investigate and harness the region-aware capabilities from DAM for the text-rich VQA problem that requires reasoning over text-based information within images. DAM-QA incorporates a mechanism that aggregates answers from multiple regional views of image content, enabling more effective identification of evidence that may be tied to text-related elements. Experiments on six VQA benchmarks show that our approach consistently outperforms the baseline DAM, with a notable 7+ point gain on DocVQA. DAM-QA also achieves the best overall performance among region-aware models with fewer parameters, significantly narrowing the gap with strong generalist VLMs. These results highlight the potential of DAM-like models for text-rich and broader VQA tasks when paired with efficient usage and integration strategies. Our code is publicly available at this github
research_themes:
related_projects:
thumbnail:
figure:
media_type:
paper_url:
code_url:
demo_url:
doi_url:
featured:
status: accepted

---

title: Semi-MoE: Mixture-of-Experts meets Semi-Supervised Histopathology Segmentation
authors: Nguyen Lan Vi Vu, Thanh-Huy Nguyen, Thien Nguyen, Daisuke Kihara, Tianyang Wang, Xingjian Li, Min Xu
year: 2025
venue: BMVC 2025
publication_type: poster
abstract: Semi-supervised learning has been employed to alleviate the need for extensive labeled data for histopathology image segmentation, but existing methods struggle with noisy pseudo-labels due to ambiguous gland boundaries and morphological misclassification. This paper introduces Semi-MOE, to the best of our knowledge, the first multi-task Mixture-of-Experts framework for semi-supervised histopathology image segmentation. Our approach leverages three specialized expert networks: A main segmentation expert, a signed distance field regression expert, and a boundary prediction expert, each dedicated to capturing distinct morphological features. Subsequently, the Multi-Gating Pseudo-labeling module dynamically aggregates expert features, enabling a robust fuse-and-refine pseudo-labeling mechanism. Furthermore, to eliminate manual tuning while dynamically balancing multiple learning objectives, we propose an Adaptive Multi-Objective Loss. Extensive experiments on GlaS and CRAG benchmarks show that our method outperforms state-of-the-art approaches in low-label settings, highlighting the potential of MoE-based architectures in advancing semi-supervised segmentation. Our code is available at this github
research_themes:
related_projects:
thumbnail:
figure:
media_type:
paper_url:
code_url:
demo_url:
doi_url:
featured:
status: accepted

---

title:
authors:
year: 2025
venue: MICCAI 2025 Workshops
publication_type: workshop
abstract:
research_themes:
related_projects:
thumbnail:
figure:
media_type:
paper_url:
code_url:
demo_url:
doi_url:
featured:
status: accepted

---

title:
authors:
year: 2025
venue: MICCAI 2025 Workshops
publication_type: workshop
abstract:
research_themes:
related_projects:
thumbnail:
figure:
media_type:
paper_url:
code_url:
demo_url:
doi_url:
featured:
status: accepted

---

title:
authors:
year: 2025
venue: MICCAI 2025 Workshops
publication_type: workshop
abstract:
research_themes:
related_projects:
thumbnail:
figure:
media_type:
paper_url:
code_url:
demo_url:
doi_url:
featured:
status: accepted

---

title:
authors:
year: 2025
venue: MICCAI 2025 Workshops
publication_type: workshop
abstract:
research_themes:
related_projects:
thumbnail:
figure:
media_type:
paper_url:
code_url:
demo_url:
doi_url:
featured:
status: accepted

---

title: Describe Anything in Medical Images
authors: Xi Xiao, Yunbei Zhang, Thanh-Huy Nguyen, Ba-Thinh Lam, Janet Wang, Lin Zhao, Jihun Hamm, Tianyang Wang, Xingjian Li, Xiao Wang, Hao Xu, Tianming Liu, Min Xu
year: 2025
venue: ICML 2025 Workshop - FM4LS
publication_type: workshop
abstract: Localized image captioning has made significant progress with models like the Describe Anything Model (DAM), which can generate detailed region-specific descriptions without explicit region-text supervision. However, such capabilities have yet to be widely applied to specialized domains like medical imaging, where diagnostic interpretation relies on subtle regional findings rather than global understanding. To mitigate this gap, we propose MedDAM, the first comprehensive framework leveraging large vision-language models for region-specific captioning in medical images. MedDAM employs medical expert-designed prompts tailored to specific imaging modalities and establishes a robust evaluation benchmark comprising a customized assessment protocol, data pre-processing pipeline, and specialized QA template library. This benchmark evaluates both MedDAM and other adaptable large vision-language models, focusing on clinical factuality through attribute-level verification tasks, thereby circumventing the absence of ground-truth region-caption pairs in medical datasets. Extensive experiments on the VinDr-CXR, LIDC-IDRI, and SkinCon datasets demonstrate MedDAM's superiority over leading peers (including GPT-4o, Claude 3.7 Sonnet, LLaMA-3.2 Vision, Qwen2.5-VL, GPT-4Rol, and OMG-LLaVA) in the task, revealing the importance of region-level semantic alignment in medical image understanding and establishing MedDAM as a promising foundation for clinical vision-language integration.
research_themes:
related_projects:
thumbnail:
figure:
media_type:
paper_url:
code_url:
demo_url:
doi_url:
featured:
status: accepted

---

title: Saw-Monodetr: Shape-Aware Adaptive Weighted Transformer for Monocular 3d Object Detection
authors: Dinh Dai Quan Tran; Thanh-Huy Nguyen; Vinh Quang Dinh; Ren-Hung Hwang; Van-Linh Nguyen
year: 2025
venue: IEEE ICIP 2025
publication_type: conference
abstract: Monocular 3D object detection offers a cost-effective alternative to LiDAR and stereo cameras by determining 3D positions from a single image. DETR-based methods leverage transformers to integrate visual and depth representations globally, achieving state-of-the-art performance and competitive speeds without manual configurations like non-maximum suppression or anchor generation. However, averaging multiple-depth predictions hinders precise accuracy. This work enhances depth prediction through two innovations: (1) improving depth quality using a Shape-aware Foreground Depth Map (SFDM) and (2) Depth Adaptive Weight (DAW) helps the final depth prediction to benefit flexibly from each component’s contribution. Experiments on the KITTI benchmark demonstrate the proposed model’s state-of-the-art performance. The code is available at https://github.com/useracc687/saw-monodetr.
research_themes:
related_projects:
thumbnail:
figure:
media_type:
paper_url:
code_url:
demo_url:
doi_url:
featured:
status: accepted

---

title: IGL-DT: Iterative Global-Local Feature Learning with Dual-Teacher Semantic Segmentation Framework under Limited Annotation Scheme
authors: Dinh Dai Quan Tran, Hoang-Thien Nguyen, Thanh-Huy Nguyen, Gia-Van To, Tien-Huy Nguyen, Quan Nguyen
year: 2025
venue: CVPR 2025 Workshop
publication_type: workshop
abstract: Semi-Supervised Semantic Segmentation (SSSS) aims to improve segmentation accuracy by leveraging a small set of labeled images alongside a larger pool of unlabeled data. Recent advances primarily focus on pseudo-labeling, consistency regularization, and co-training strategies. However, existing methods struggle to balance global semantic representation with fine-grained local feature extraction. To address this challenge, we propose a novel tri-branch semi-supervised segmentation framework incorporating a dual-teacher strategy, named IGL-DT. Our approach employs SwinUnet for high-level semantic guidance through Global Context Learning and ResUnet for detailed feature refinement via Local Regional Learning. Additionally, a Discrepancy Learning mechanism mitigates over-reliance on a single teacher, promoting adaptive feature learning. Extensive experiments on benchmark datasets demonstrate that our method outperforms state-of-the-art approaches, achieving superior segmentation performance across various data regimes.
research_themes:
related_projects:
thumbnail:
figure:
media_type:
paper_url:
code_url:
demo_url:
doi_url:
featured:
status: accepted

---

title: Fetal-BCP: Addressing Empirical Distribution Gap in Semi-Supervised Fetal Ultrasound Segmentation
authors: Ha-Hieu Pham; Le Tran Quoc Khanh; Hoang-Thien Nguyen; Nguyen Lan Vi Vu; Quang-Vinh Dinh; Thanh-Huy Nguyen
year: 2025
venue: 2025 IEEE 22nd International Symposium on Biomedical Imaging (ISBI)
publication_type: conference
abstract: Fetal ultrasound imaging is critical for examining cervical architecture, but segmentation remains difficult due to hard-to-learn features under a lack of labeled data scenarios. In this paper, we present a unique semi-supervised system for cervical segmentation that efficiently uses both labeled and unlabeled images. Inspired by Bidirectional Copy-Paste (BCP), our proposed method, named Fetal-BCP, uses a Mean Teacher framework and thorough data augmentation approaches to reduce the distribution mismatch between labeled and unlabeled data. Our approach significantly lessens the human annotation effort by balancing trustworthy supervision with inferred annotations through consistency regularization and pseudo-labeling. Our results maintained the top rank on the leaderboard of the Fetal Ultrasound Grand Challenge of ISBI 2025 Challenge, surpassing many state-of-the-art methods on both Dice and HD metrics.
research_themes:
related_projects:
thumbnail:
figure:
media_type:
paper_url:
code_url:
demo_url:
doi_url:
featured:
status: accepted

---

title: MLG2Net: Molecular global graph network for drug response prediction in lung cancer cell lines
authors: Thi-Oanh Tran, Thanh-Huy Nguyen, Tuan Tung Nguyen, Nguyen Quoc Khanh Le
year: 2025
venue: Journal of Medical Systems
publication_type: journal
abstract: Drug response prediction (DRP) is a central task in the era of precision medicine. Over the past decade, the emergence of deep learning (DL) has greatly contributed to addressing DRP challenges. Notably, the prediction of DRP for cancer cell lines benefits significantly from data availability for model development. However, an effective predictive model is still challenging due to issues with data quality, high-dimensional data, and multi-omics data integration. In this study, we introduce MLG2Net, a deep-learning model inspired by graph neural networks designed to predict DRP in lung cancer cell lines based on pharmacogenomics data. Our model comprises two key components: drug SMILES described by local and global graph networks and cell line genomics are illustrated as a map. Our results show that MLG2Net outperforms three reference graph networks. MLG2Net performance reached a Pearson coefficient correlation of 0.8616 and a root mean square error (RMSE) of 2.94e-6 in predicting drug responses for Lung Adenocarcinoma (LUAD) cell lines. Subsequent testing on the Lung Squamous Cell Carcinoma (LUSC) dataset reveals lower performance: 0.7999, RMSE: 4.08e-6), attributed to the dataset's smaller size influencing model capacity. Moreover, we assessed the model's architecture by isolating its components, with results indicating that the global network is particularly effective in this task. In conclusion, MLG2Net exhibited promising applications in DRP for cancer cell lines, with potential advancements by incorporating larger datasets.
research_themes:
related_projects:
thumbnail:
figure:
media_type:
paper_url:
code_url:
demo_url:
doi_url:
featured:
status: accepted

---

title: Semi-Supervised Skin Lesion Segmentation under Dual Mask Ensemble with Feature Discrepancy Co-Training
authors: Thanh-Huy Nguyen, Thien Nguyen, Xuan Bach Nguyen, Nguyen Lan Vi Vu, Vinh Quang Dinh, Fabrice MERIAUDEAU
year: 2025
venue: MIDL 2025
publication_type: conference
abstract: Skin Lesion Segmentation with supportive Deep Learning has become essential in skin lesion analysis and skin cancer diagnosis. However, in the practical scenario of clinical implementation, there is a limitation in human-annotated labels for training data, which leads to poor performance in supervised training models. In this paper, we propose Dual Mask Ensemble (DME) based on a dual-branch co-training network, which aims to enforce two models to exploit information from different views. Specifically, we introduce a novel feature discrepancy loss trained with a cross-pseudo supervision strategy, which enhances model representation by encouraging the sub-networks to learn from distinct features, thereby mitigating feature collapse. Additionally, Dual Mask Ensemble training enables the sub-models to extract more meaningful information from unlabeled data by combining mask predictions. Experimental results demonstrate the effectiveness of our approach, achieving state-of-the-art performance across several metrics (Dice and Jaccard) on the ISIC2018 and HAM10000 datasets. Our code is available at https://github.com/antares0811/DME-FD.
research_themes:
related_projects:
thumbnail:
figure:
media_type:
paper_url:
code_url:
demo_url:
doi_url:
featured:
status: accepted

---

## Non-publication items from the source list

These source-list items are news/events rather than publication records:

- 2026.01: Attending ICASSP 2026 in Barcelona, Spain.
- 2025.09: FLARE Challenge Task 5 at MICCAI 2025 Honorable Mention Award.
- 2025.09: Received Master's degree in Artificial Intelligence in Health.
- 2025.09: Program Committee at AAAI 2026.
- 2025.07: Invited talk at Feinberg School of Medicine, Northwestern University.
- 2025.06: Started affiliating with Bagci Lab as research assistant at Northwestern University.
- 2025.05: Fetal Ultrasound Grand Challenge at IEEE ISBI 2025 Best Runner-Up Award.
- 2025.02: Started Research Associate position at Carnegie Mellon University.
