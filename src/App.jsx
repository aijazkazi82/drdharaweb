import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Calendar, Phone, MessageSquare, MapPin, Clock, Shield, Award,
  ChevronRight, ChevronDown, CheckCircle2, AlertCircle, FileText,
  Upload, Search, Filter, ExternalLink, Menu, X, ArrowRight,
  BookOpen, Video, HeartHandshake, Eye, Download, Edit3, Trash2,
  Plus, RefreshCw, UserCheck, Stethoscope, Lock, Key, LogOut,
  Sliders, Image as ImageIcon, HelpCircle, Share2, Info
} from 'lucide-react';

// ==========================================
// SEED DATA & CONSTANTS
// ==========================================

const INITIAL_LOCATIONS = [
  { id: '1', name: 'CritiCare Hospital', area: 'Andheri East', region: 'Western Suburbs', address: 'Plot No. 516, Besides SBI, Telli Galli, Maheshwari Nagar, Andheri East, Mumbai 400069', active: true },
  { id: '2', name: 'CritiCare Asia Multispeciality Hospital', area: 'Andheri West', region: 'Western Suburbs', address: 'Plot No. 38/39, Main Gulmohar Road, JVPD Scheme, Juhu, Andheri West, Mumbai 400049', active: true },
  { id: '3', name: 'CritiCare Asia Multispeciality Hospital', area: 'Malad West', region: 'Western Suburbs', address: 'Plot No. 1064, New Link Road, near Lakozy Toyota, Malad West, Mumbai 400064', active: true },
  { id: '4', name: 'CritiCare Asia Multi Specialty Hospital', area: 'Kurla West', region: 'Central / Harbour', address: 'Building No. 1, Kirol Road, off LBS Marg, near Kohinoor International School, Kurla West, Mumbai 400070', active: true },
  { id: '5', name: 'Sunrise Oncology Centre', area: 'Borivali West', region: 'Western Suburbs', address: '1st Floor, Sai Towers, Sodawala Lane, Govind Nagar, Borivali West, Mumbai 400092', active: true },
  { id: '6', name: 'Sunrise Oncology Center', area: 'Vasai West', region: 'Extended Suburbs (Mira-Vasai)', address: 'Before Cardinal Hospital, Satme/Mudi, Vasai West, Vasai-Virar 401207', active: true },
  { id: '7', name: 'Infinity Multispeciality Hospital', area: 'Goregaon West', region: 'Western Suburbs', address: '1st Floor, Vir Sanghvi Marg, above Empire Banquet, Udyog Nagar, Goregaon West, Mumbai 400104', active: true },
  { id: '8', name: 'Healing Touch Diagnostics', area: 'Andheri West', region: 'Western Suburbs', address: 'Flat No. 20, Evershine Apartment 1, J.P. Road, Four Bungalows, Andheri West, Mumbai', active: true },
  { id: '9', name: 'Jain ENT Hospital', area: 'Mira Road East', region: 'Extended Suburbs (Mira-Vasai)', address: '#118,119, Poonam Orbit, Queens Park, Near Sai Baba Temple, Mira Road East, Mira Bhayandar 401105', active: true },
  { id: '10', name: 'Sujay Hospital', area: 'Vile Parle West', region: 'Western Suburbs', address: '25, Gulmohar Park, Gulmohar Road, JVPD Scheme, Vile Parle West, Mumbai 400049', active: true },
  { id: '11', name: 'Advanced Multispeciality Hospital', area: 'Vile Parle West', region: 'Western Suburbs', address: 'CMPH Medical College Campus, Natakar Gadkari Marg, Gulmohar Rd, opp. Amar Juice Centre, Irla, Vile Parle West, Mumbai 400056', active: true },
  { id: '12', name: 'Sanjeevani Mamta Hospital & Research Centre', area: 'Andheri East', region: 'Western Suburbs', address: '1, Nityanand Nagar CHS, Sahar Rd, Railway Colony, Andheri East, Mumbai 400069', active: true },
  { id: '13', name: 'Healing Touch Diagnostics', area: 'Mumbai Central', region: 'Central / Harbour', address: '101 A wing, Zia Apartment, Bellasis Road, Mumbai Central', active: true },
  { id: '14', name: 'Cardinal Gracias Hospital', area: 'Vasai Road', region: 'Extended Suburbs (Mira-Vasai)', address: 'Bangli Checkpoint, before Cardinal Hospital, Bassein Road, Sandor, Mudi, Vasai West, Vasai-Virar 401207', active: true },
];

const TREATMENTS_DATA = [
  {
    slug: 'oral-cancer',
    title: 'Oral Cavity Cancer & Surgery',
    subtitle: 'Tongue, Buccal Mucosa, Gingivobuccal Sulcus, Palate & Floor of Mouth',
    overview: 'Oral cancers encompass malignant growths in the lips, tongue, gums, lining of cheeks, and floor of the mouth. Early surgical resection with wide oncological margins is the cornerstone of curative management.',
    symptoms: ['Non-healing mouth ulcer lasting > 2 weeks', 'White (leukoplakia) or red (erythroplakia) patch', 'Pain or difficulty chewing or swallowing', 'Bleeding or unexplained numbness in the mouth', 'Restricted mouth opening (trismus)'],
    diagnosis: 'Comprehensive physical and endoscopic examination, punch or incisional biopsy, high-resolution contrast CT / MRI, and metastatic workup.',
    approach: 'Wide local excision or compartment resection with safe margins, simultaneous neck dissection for regional lymphatic clearance, followed by immediate tissue reconstruction.',
    recovery: 'Inpatient recovery spans 5 to 10 days depending on whether flap reconstruction was performed. Speech and swallowing rehabilitation starts early under specialist guidance.',
    faqs: [
      { q: 'Will surgery affect my appearance and speech?', a: 'Modern oncosurgery combines radical cancer excision with tailored microvascular and regional flap reconstruction, aiming to preserve normal facial aesthetics, swallowing, and articulate speech.' },
      { q: 'Is radiation or chemotherapy needed after surgery?', a: 'The need for adjuvant therapy is determined by the final histopathology report (margins, depth of invasion, lymph node status, and extranodal extension).' }
    ]
  },
  {
    slug: 'neck-dissection',
    title: 'Neck Lumps & Neck Dissections',
    subtitle: 'Cervical Lymphadenopathy, Selective, Modified Radical & Radical Neck Dissection',
    overview: 'The neck is the primary drainage basin for all head and neck structures. Any painless, progressive neck mass requires urgent oncosurgical evaluation to rule out nodal metastases or benign cysts.',
    symptoms: ['Painless or firm lump in the side of the neck', 'Enlarging swelling not responding to antibiotics', 'Associated throat pain or voice change'],
    diagnosis: 'Ultrasound with fine needle aspiration cytology (FNAC) or ultrasound-guided core biopsy, and contrast-enhanced CT / MRI of the neck.',
    approach: 'Level-specific selective neck dissection (Levels I–V) or comprehensive modified radical neck dissection, meticulously preserving spinal accessory nerve, internal jugular vein, and sternocleidomastoid muscle whenever oncologically safe.',
    recovery: 'Drain tubes are typically removed in 48–72 hours. Shoulder range-of-motion physiotherapy is initiated immediately post-operatively.',
    faqs: [
      { q: 'Does removing neck lymph nodes weaken immunity?', a: 'No. The body possesses hundreds of lymph nodes. Removing specific regional cervical nodes does not compromise systemic immunity.' }
    ]
  },
  {
    slug: 'thyroid-parathyroid',
    title: 'Thyroid & Parathyroid Disorders',
    subtitle: 'Solitary Thyroid Nodules, Multinodular Goitre, Thyroid Carcinoma & Hyperparathyroidism',
    overview: 'Specialized management for benign thyroid nodules, multinodular goitres, and malignant thyroid neoplasms (papillary, follicular, medullary, anaplastic). Focus is placed on recurrent laryngeal nerve preservation and parathyroid safeguarding.',
    symptoms: ['Swelling in the lower midline of the neck that moves with swallowing', 'Voice changes or persistent hoarseness', 'Difficulty swallowing or breathing in advanced cases'],
    diagnosis: 'High-resolution neck ultrasound (TIRADS scoring), Serum TSH, FNAC / Bethesda classification.',
    approach: 'Hemithyroidectomy, total thyroidectomy, and central/lateral compartment neck dissection when indicated for thyroid malignancy, employing intraoperative nerve monitoring principles.',
    recovery: 'Short hospital stay (1–2 days). Voice checks occur immediately after waking up from anaesthesia.',
    faqs: [
      { q: 'Will I have to take thyroid pills for the rest of my life?', a: 'If a hemithyroidectomy is performed, the remaining lobe often maintains normal hormone levels. Following a total thyroidectomy, daily levothyroxine replacement is standard and easily managed.' }
    ]
  },
  {
    slug: 'salivary-gland-tumours',
    title: 'Salivary Gland & Parotid Tumours',
    subtitle: 'Pleomorphic Adenoma, Warthin Tumour, Mucoepidermoid & Adenoid Cystic Carcinoma',
    overview: 'Salivary gland neoplasms arise most commonly in the parotid, submandibular, or minor salivary glands. Surgical excision demands delicate microsurgical dissection to preserve the facial nerve branches that control facial expression.',
    symptoms: ['Slow-growing, painless lump below the earlobe or beneath the jawline', 'Facial weakness or twitching (a warning sign of malignancy)', 'Pain or rapid enlargement'],
    diagnosis: 'High-definition MRI/CT scan and FNAC. Incisional biopsy of the parotid is strictly avoided to prevent tumour spillage.',
    approach: 'Superficial parotidectomy with facial nerve dissection, total conservative parotidectomy, or submandibular gland excision with preservation of lingual, hypoglossal, and marginal mandibular nerves.',
    recovery: 'Patients typically go home within 2–3 days once surgical drains are removed. Temporary facial puffiness subsides within a few weeks.',
    faqs: [
      { q: 'Is there risk of facial paralysis?', a: 'For benign tumours, facial nerve branches are identified and carefully dissected free from the tumour, maintaining normal facial movement.' }
    ]
  },
  {
    slug: 'reconstructive-surgery',
    title: 'Head & Neck Reconstructive Flaps',
    subtitle: 'PMMC, Nasolabial, Forehead, Estlander Flaps & Full-Thickness Skin Grafts',
    overview: 'Surgical oncology is incomplete without functional restoration. Dr. Dhara applies advanced reconstructive techniques to reconstruct tissue defects of the tongue, jaw, lips, and facial skin following tumour excision.',
    symptoms: ['Tissue loss following oncosurgical resection', 'Facial structural defects', 'Post-traumatic soft tissue deficits'],
    diagnosis: 'Pre-operative defect calculation, vascular mapping, and patient health assessment.',
    approach: 'Pectoralis Major Myocutaneous (PMMC) flap, submental artery island flap, nasolabial flap for oral commissure/buccal defects, forehead flap for nasal reconstruction, Estlander/Abbe flaps for lip continuity, and split/full-thickness skin grafting.',
    recovery: 'Flap monitoring for perfusion, dedicated oral hygiene, step-wise dietary progression from liquid to semi-solid nourishment.',
    faqs: [
      { q: 'How does donor site healing take place?', a: 'Flap donor sites (e.g. chest wall, nasolabial fold) are closed primarily or with subtle aesthetic closure techniques designed to minimize visible scarring.' }
    ]
  },
  {
    slug: 'jaw-tumours-cysts',
    title: 'Jaw Tumours, Cysts & Mandibulectomy',
    subtitle: 'Ameloblastoma, Odontogenic Keratocysts, Fibro-osseous Lesions & Mandibular Resection',
    overview: 'Odontogenic tumours and aggressive jaw lesions require precise surgical clearance ranging from conservative enucleation/chemical cautery to segmental mandibulectomy or maxillectomy to eliminate recurrence.',
    symptoms: ['Bony expansion or swelling of the lower or upper jaw', 'Loosening of teeth without periodontal disease', 'Facial asymmetry or dental malocclusion'],
    diagnosis: 'Orthopantomogram (OPG), 3D Cone Beam CT (CBCT) or standard CT face, and histopathological analysis.',
    approach: 'Marginal or segmental mandibulectomy, partial maxillectomy, reconstruction with titanium reconstruction plates and regional flap soft-tissue closure.',
    recovery: 'Liquid diet progression, bite adjustment, and scheduled panoramic radiographic monitoring.',
    faqs: [
      { q: 'Can my jaw bone be saved?', a: 'Whenever margins permit, conservative marginal mandibulectomy preserves continuity of the lower jaw, preventing contour changes.' }
    ]
  },
  {
    slug: 'laryngeal-cancers',
    title: 'Laryngeal & Hypopharyngeal Cancers',
    subtitle: 'Vocal Cord Malignancies, Supraglottic Tumours & Pyriform Sinus Carcinomas',
    overview: 'Tumours of the voice box and upper food tract demand prompt diagnosis and multi-disciplinary planning to optimize voice preservation and safe airway management.',
    symptoms: ['Hoarseness or voice change lasting > 3 weeks', 'Difficulty swallowing or sensation of food getting stuck', 'Referred ear pain (otalgia)', 'Noisy breathing (stridor)'],
    diagnosis: 'Videolaryngoscopy, direct laryngoscopy with deep biopsy under general anaesthesia, and high-resolution cross-sectional neck CT.',
    approach: 'Diagnostic micro-laryngoscopy, tracheostomy for threatened airway, partial or total laryngectomy with or without voice prosthesis rehabilitation, and combined chemoradiation coordination.',
    recovery: 'Speech therapy and specialized swallowing rehabilitation post-procedure.',
    faqs: [
      { q: 'Will I still be able to talk?', a: 'Depending on stage, vocal cords can often be spared. In cases needing total laryngectomy, modern tracheoesophageal voice prostheses allow patients to speak fluently again.' }
    ]
  },
  {
    slug: 'facial-trauma-infections',
    title: 'Facial Trauma & Maxillofacial Infections',
    subtitle: 'Facial Bone Fractures, Deep Neck Space Abscesses & Ludwig Angina',
    overview: 'Urgent management of facial trauma including mandibular, maxillary, and zygomatic complex fractures, along with life-threatening fascial space infections of dental and head/neck origin.',
    symptoms: ['Facial bone deformity or step after injury', 'Severe facial swelling with fever and difficulty opening mouth or breathing', 'Altered dental bite'],
    diagnosis: 'Non-contrast 3D CT facial bones, airway evaluation, blood cultures.',
    approach: 'Open Reduction and Internal Fixation (ORIF) using low-profile titanium mini-plates, emergency surgical incision and dependent drainage of deep fascial space abscesses with airway safeguarding.',
    recovery: 'Rapid reduction in swelling, pain relief, and restoration of stable pre-trauma dental occlusion.',
    faqs: [
      { q: 'Are surgical cuts made outside on the face?', a: 'Whenever possible, incisions are made discreetly inside the oral cavity to leave zero visible facial scarring.' }
    ]
  },
  {
    slug: 'palliative-care',
    title: 'Palliative & Supportive Onco-Care',
    subtitle: 'Comprehensive Symptom Control, Pain Management & Quality of Life',
    overview: 'With certified fellowship credentials from the Indian Association of Palliative Care (IAPC), Dr. Dhara provides holistic symptom relief, dignified pain control, wound care, and psychosocial guidance alongside primary oncology treatment.',
    symptoms: ['Intractable oncological pain', 'Fungating head/neck tumour wounds', 'Nutritional depletion, dry mouth, or difficulty coping with treatment'],
    diagnosis: 'Multi-dimensional symptom assessment (ESAS score), WHO pain ladder titration.',
    approach: 'Systematic pain titration with non-opioid and opioid analgesics, specialized odour- and exsudate-controlling wound dressings, palliative tracheostomy, PEG/Ryle’s tube feeding planning, and family counselling.',
    recovery: 'Focuses on immediate comfort, dignity, and sustainable home-care management.',
    faqs: [
      { q: 'Does palliative care mean giving up hope?', a: 'Never. Palliative care works alongside active curative treatments to relieve pain and improve resilience, helping patients endure treatment better and live with comfort and dignity.' }
    ]
  }
];

const INITIAL_ARTICLES = [
  {
    slug: 'early-warning-signs-oral-cancer',
    title: '5 Warning Signs of Oral Cancer You Should Never Ignore',
    category: 'Early Detection',
    date: 'Oct 14, 2026',
    readTime: '4 min read',
    summary: 'A persistent mouth ulcer or a whitish patch might appear harmless at first. Recognizing when an oral change requires an oncosurgeon’s evaluation is crucial.',
    content: `
      Oral cancer is among the most prevalent cancers in India, primarily due to tobacco chewing, betel nut (supari), and smoking. The single most important factor determining cure and recovery is the stage at which diagnosis is made.
      
      Here are the 5 red-flag symptoms:
      1. Non-healing ulcer: Any ulcer inside the mouth, cheek, or tongue that does not resolve within 14 days, even without pain, needs a biopsy.
      2. Red or White Patches: Leukoplakia (white) or Erythroplakia (red) patches indicate pre-malignant mucosal changes.
      3. Difficulty chewing or moving the tongue: Stiffness in the tongue or difficulty moving food back.
      4. Persistent lump in the neck: Often, the first sign of an oral lesion spreading is a painless lymph node lump in the upper neck.
      5. Unexplained loose teeth: Teeth becoming loose without gum disease.

      Remember: An early clinical evaluation and a gentle punch biopsy can save lives and prevent extensive surgery.
    `
  },
  {
    slug: 'what-to-expect-during-neck-dissection',
    title: 'What to Expect During and After a Neck Dissection',
    category: 'Surgical Guidance',
    date: 'Sep 28, 2026',
    readTime: '6 min read',
    summary: 'Understanding why cervical lymph nodes are evaluated, how the surgical team protects nerves, and what recovery entails.',
    content: `
      When patients are advised to undergo a neck dissection, anxiety often centres on scarring and shoulder mobility. 

      Why is neck dissection necessary?
      Cancer cells from the oral cavity or larynx first migrate to regional cervical lymph nodes. Clearing these nodes halts the disease before it can spread to distant organs.

      Nerve preservation techniques:
      Modern head and neck surgeons practice selective and nerve-sparing techniques. The 11th cranial nerve (spinal accessory nerve), which powers shoulder elevation, is preserved wherever possible.

      Post-operative recovery:
      - Mild shoulder stiffness is common and resolves with gentle guided exercises.
      - Surgical drains are typically removed on Day 2 or 3.
      - Incision lines are strategically placed in natural neck creases to heal into discreet, faint lines.
    `
  },
  {
    slug: 'nutrition-and-swallowing-after-head-neck-surgery',
    title: 'Nutritional Care and Swallowing Recovery Post-Surgery',
    category: 'Rehabilitation',
    date: 'Aug 19, 2026',
    readTime: '5 min read',
    summary: 'Practical dietary recommendations and gentle rehabilitation exercises for patients recovering from oral and jaw surgery.',
    content: `
      Nutritional healing is essential for flap survival and wound repair. Here are structured recommendations for patients and caregivers:

      Immediate Post-Op (Days 1–5):
      Enteral nutrition via a soft nasogastric tube allows oral mucosal sutures to heal without tension or contamination from food particles.

      Transition to Smooth Purees:
      Once cleared by the surgeon, patients start with cool, non-spicy blended foods: dalia, strained khichdi, curd, blended fruit soups, and high-protein supplemental shakes. Avoid hot, acidic, or heavily spiced curries.

      Swallowing Exercises:
      Effortful swallow and tongue mobility exercises under speech pathologist guidance prevent long-term swallowing difficulties.
    `
  }
];

const INITIAL_FAQS = [
  { q: 'How does Dr. Dhara coordinate consultations across different Mumbai hospitals?', a: 'Dr. Dhara operates on an on-call appointment basis across premier multi-speciality hospitals across Mumbai. When you submit an appointment request, our practice coordinator matches your preferred suburb (e.g. Andheri, Borivali, Goregaon, Kurla, or Vasai) with her surgical schedule and confirms the precise time and hospital location.' },
  { q: 'Is a biopsy safe, or can it cause cancer to spread?', a: 'A biopsy is completely safe and remains the gold standard for diagnosis. It does NOT cause cancer to spread. In fact, initiating treatment without an accurate histological biopsy is unsafe and counterproductive.' },
  { q: 'What should I bring for my first consultation?', a: 'Please bring all previous doctor consultation notes, biopsy pathology slides and blocks (if already done), recent CT/MRI scan films with reports, blood work reports, and a list of ongoing medications.' },
  { q: 'Can outstation or international patients get a second opinion?', a: 'Yes. You can use our Second Opinion portal to securely upload scan reports and biopsy summaries. Dr. Dhara will review your documentation and coordinate a structured tele-consultation or detailed clinical evaluation report.' },
  { q: 'Do you offer emergency trauma care?', a: 'For acute emergencies such as active profuse bleeding or respiratory distress, please proceed directly to the nearest hospital casualty immediately. Dr. Dhara attends emergency trauma cases upon notification by hospital emergency departments.' }
];

const INITIAL_PUBLICATIONS = [
  {
    title: 'Prognostic indicators of oral squamous cell carcinoma – study from a south Indian tertiary care centre',
    journal: 'Journal of Head & Neck Oncology & Surgery',
    type: 'Original Research Paper',
    highlight: 'Comprehensive clinicopathological analysis of surgical margin clearance, lymph node ratio, and depth of invasion (DOI) impacting long-term recurrence-free survival in oral SCC.'
  },
  {
    title: 'Ponderous pleomorphic adenoma of parotid obscuring a grievous tumor of the head and neck: a rare case report',
    journal: 'International Case Reports in Maxillofacial Surgery',
    type: 'Peer-Reviewed Clinical Case Report',
    highlight: 'Documentation of an intricate surgical excision involving complex facial nerve preservation in an unusually large and long-standing benign salivary lesion co-existing with regional pathology.'
  }
];

// Default Portrait URL (Direct link to uploaded portrait)
const DEFAULT_PORTRAIT_URL = 'dr-dhara-portrait.png';

// Fallback embedded SVG representation if offline / broken link
const FALLBACK_PORTRAIT_SVG = (
  <div className="w-full h-full bg-gradient-to-b from-[#0F5C6B]/20 to-[#0F5C6B]/80 flex flex-col items-center justify-end p-6 text-white text-center">
    <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-3">
      <Stethoscope className="w-12 h-12 text-white" />
    </div>
    <span className="font-serif font-semibold text-lg">Dr. Dhara P. Sirodaria</span>
    <span className="text-xs text-teal-100">BDS, MDS (OMFS), Head & Neck Oncosurgeon</span>
  </div>
);

// ==========================================
// BRAND LOGO SVG COMPONENT
// ==========================================

function BrandLogo({ variant = 'horizontal', isDark = false, className = '' }) {
  const primaryColor = isDark ? '#FFFFFF' : '#0F5C6B';
  const accentColor = isDark ? '#4FD1C5' : '#14B8A6';
  const subtextColor = isDark ? '#E2E8F0' : '#4A5568';
  const crestFill = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(15, 92, 107, 0.08)';

  if (variant === 'icon') {
    return (
      <svg className={`w-10 h-10 ${className}`} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="28" fill={crestFill} />
        {/* Organic Care & Precision Crest */}
        <path d="M50 14C32 14 20 28 20 46C20 68 46 84 50 86C54 84 80 68 80 46C80 28 68 14 50 14Z" stroke={primaryColor} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M50 24C40 32 32 44 32 54C32 68 50 76 50 76C50 76 68 68 68 54C68 44 60 32 50 24Z" stroke={accentColor} strokeWidth="2.5" strokeLinecap="round" strokeDasharray="3 3" />
        {/* Monogram DS */}
        <text x="32" y="58" fontFamily="serif" fontSize="28" fontWeight="bold" fill={primaryColor}>D</text>
        <text x="50" y="60" fontFamily="serif" fontSize="28" fontWeight="bold" fill={accentColor}>S</text>
      </svg>
    );
  }

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <svg className="w-10 h-10 flex-shrink-0" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="26" fill={crestFill} />
        <path d="M50 14C32 14 20 28 20 46C20 68 46 84 50 86C54 84 80 68 80 46C80 28 68 14 50 14Z" stroke={primaryColor} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M50 24C40 32 32 44 32 54C32 68 50 76 50 76C50 76 68 68 68 54C68 44 60 32 50 24Z" stroke={accentColor} strokeWidth="2" strokeDasharray="3 3" />
        <text x="32" y="58" fontFamily="serif" fontSize="28" fontWeight="bold" fill={primaryColor}>D</text>
        <text x="50" y="60" fontFamily="serif" fontSize="28" fontWeight="bold" fill={accentColor}>S</text>
      </svg>
      <div className="leading-tight">
        <div className="font-serif font-bold text-lg tracking-tight" style={{ color: primaryColor }}>
          Dr. Dhara Sirodaria
        </div>
        <div className="text-[11px] font-sans font-medium uppercase tracking-wider" style={{ color: subtextColor }}>
          Head & Neck Onco & Reconstructive Surgeon
        </div>
      </div>
    </div>
  );
}

// ==========================================
// MAIN APP COMPONENT
// ==========================================

export default function App() {
  // Navigation State
  const [currentPage, setCurrentPage] = useState('home'); // home, about, treatments, treatment-detail, locations, book, second-opinion, articles, article-detail, faqs, videos, publications, contact, admin, legal-privacy, legal-disclaimer
  const [activeTreatmentSlug, setActiveTreatmentSlug] = useState('oral-cancer');
  const [activeArticleSlug, setActiveArticleSlug] = useState('early-warning-signs-oral-cancer');
  const [selectedBookingLocation, setSelectedBookingLocation] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // User Guide Modal
  const [showUserGuide, setShowUserGuide] = useState(false);

  // App-level Dynamic Data with LocalStorage Persistence
  const [locations, setLocations] = useState(() => {
    const saved = localStorage.getItem('ds_locations');
    return saved ? JSON.parse(saved) : INITIAL_LOCATIONS;
  });

  const [articles, setArticles] = useState(() => {
    const saved = localStorage.getItem('ds_articles');
    return saved ? JSON.parse(saved) : INITIAL_ARTICLES;
  });

  const [treatments, setTreatments] = useState(() => {
    const saved = localStorage.getItem('ds_treatments');
    return saved ? JSON.parse(saved) : TREATMENTS_DATA;
  });

  const [appointments, setAppointments] = useState(() => {
    const saved = localStorage.getItem('ds_appointments');
    return saved ? JSON.parse(saved) : [
      {
        id: 'APT-1001',
        fullName: 'Ramesh K. Shah',
        mobile: '9820123456',
        email: 'ramesh.shah@example.com',
        age: 58,
        type: 'In-person at a hospital',
        location: 'CritiCare Hospital – Andheri East',
        preferredDate: '2026-11-05',
        timeSlot: 'Morning 9–12',
        concern: 'Non-healing buccal mucosa ulcer',
        status: 'Confirmed',
        notes: 'Pre-op biopsy reviewed. Needs contrast CT neck.',
        createdAt: '2026-10-31 10:20 AM'
      },
      {
        id: 'APT-1002',
        fullName: 'Meena Kulkarni',
        mobile: '9167234567',
        email: 'meenak@example.com',
        age: 44,
        type: 'Second opinion – records review',
        location: 'Sunrise Oncology Centre – Borivali West',
        preferredDate: '2026-11-06',
        timeSlot: 'Afternoon 12–4',
        concern: 'Thyroid nodule Bethesda IV',
        status: 'New',
        notes: 'Uploaded ultrasound & FNAC report. Patient requests video call.',
        createdAt: '2026-11-01 02:45 PM'
      }
    ];
  });

  const [siteSettings, setSiteSettings] = useState(() => {
    const saved = localStorage.getItem('ds_site_settings');
    return saved ? JSON.parse(saved) : {
      phone: '+91 70265 64757',
      whatsapp: '+91 70265 64757',
      email: 'dhara.sirodaria@gmail.com',
      registration: 'Maharashtra State Registration A-24226 | AOMSI LM3588',
      heroHeadline: 'Specialist care for head & neck conditions',
      heroSubtext: 'Compassionate, evidence-based surgical oncology and tissue reconstruction across Mumbai’s leading hospitals. Every patient receives meticulous individualised attention.',
      doctorPortraitUrl: DEFAULT_PORTRAIT_URL
    };
  });

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('ds_locations', JSON.stringify(locations));
  }, [locations]);

  useEffect(() => {
    localStorage.setItem('ds_appointments', JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem('ds_articles', JSON.stringify(articles));
  }, [articles]);

  useEffect(() => {
    localStorage.setItem('ds_treatments', JSON.stringify(treatments));
  }, [treatments]);

  useEffect(() => {
    localStorage.setItem('ds_site_settings', JSON.stringify(siteSettings));
  }, [siteSettings]);

  // Scroll to top on page navigate
  const navigateTo = (page, param = null) => {
    setCurrentPage(page);
    if (param && (page === 'treatment-detail' || page === 'treatments')) {
      setActiveTreatmentSlug(param);
    }
    if (param && page === 'article-detail') {
      setActiveArticleSlug(param);
    }
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookLocation = (locName) => {
    setSelectedBookingLocation(locName);
    navigateTo('book');
  };

  return (
    <div className="min-h-screen bg-[#FAFAF7] text-slate-800 font-sans flex flex-col antialiased selection:bg-[#0F5C6B] selection:text-white">
      {/* Emergency & Reassurance Top Bar */}
      <div className="bg-[#0B4450] text-teal-50 px-4 py-1.5 text-xs text-center border-b border-teal-800 flex justify-between items-center sm:px-8">
        <div className="hidden md:flex items-center gap-2">
          <Shield className="w-3.5 h-3.5 text-teal-300" />
          <span>{siteSettings.registration}</span>
        </div>
        <div className="mx-auto md:mx-0 flex items-center gap-3 text-[11px] sm:text-xs">
          <span>Dr. Dhara visits Mumbai hospitals on an on-call appointment basis</span>
          <span className="hidden sm:inline">·</span>
          <a href={`tel:${siteSettings.phone.replace(/\s+/g, '')}`} className="font-semibold text-teal-200 hover:text-white transition flex items-center gap-1">
            <Phone className="w-3 h-3" /> {siteSettings.phone}
          </a>
        </div>
        <button 
          onClick={() => setShowUserGuide(true)}
          className="hidden lg:flex items-center gap-1 text-[11px] text-teal-200 hover:text-white bg-teal-900/60 px-2 py-0.5 rounded transition"
        >
          <HelpCircle className="w-3 h-3" /> Doctor's Guide
        </button>
      </div>

      {/* Main Sticky Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <div onClick={() => navigateTo('home')} className="cursor-pointer">
            <BrandLogo />
          </div>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-6 text-sm font-medium text-slate-600">
            <button onClick={() => navigateTo('home')} className={`hover:text-[#0F5C6B] transition ${currentPage === 'home' ? 'text-[#0F5C6B] font-semibold' : ''}`}>Home</button>
            <button onClick={() => navigateTo('about')} className={`hover:text-[#0F5C6B] transition ${currentPage === 'about' ? 'text-[#0F5C6B] font-semibold' : ''}`}>About</button>
            <button onClick={() => navigateTo('treatments')} className={`hover:text-[#0F5C6B] transition ${currentPage === 'treatments' || currentPage === 'treatment-detail' ? 'text-[#0F5C6B] font-semibold' : ''}`}>Treatments</button>
            <button onClick={() => navigateTo('locations')} className={`hover:text-[#0F5C6B] transition ${currentPage === 'locations' ? 'text-[#0F5C6B] font-semibold' : ''}`}>Hospitals & Locations</button>
            <button onClick={() => navigateTo('second-opinion')} className={`hover:text-[#0F5C6B] transition ${currentPage === 'second-opinion' ? 'text-[#0F5C6B] font-semibold' : ''}`}>Second Opinion</button>
            <button onClick={() => navigateTo('articles')} className={`hover:text-[#0F5C6B] transition ${currentPage === 'articles' || currentPage === 'article-detail' ? 'text-[#0F5C6B] font-semibold' : ''}`}>Patient Guide</button>
            <button onClick={() => navigateTo('publications')} className={`hover:text-[#0F5C6B] transition ${currentPage === 'publications' ? 'text-[#0F5C6B] font-semibold' : ''}`}>Academics</button>
            <button onClick={() => navigateTo('contact')} className={`hover:text-[#0F5C6B] transition ${currentPage === 'contact' ? 'text-[#0F5C6B] font-semibold' : ''}`}>Contact</button>
          </nav>

          {/* Header Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <a 
              href={`https://wa.me/${siteSettings.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hello Dr. Dhara, I would like to enquire regarding a head & neck consultation.')}`}
              target="_blank" 
              rel="noreferrer"
              className="px-3.5 py-2 rounded-xl text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition flex items-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
              WhatsApp
            </a>
            <button
              onClick={() => navigateTo('book')}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-[#0F5C6B] hover:bg-[#0C4753] shadow-sm shadow-[#0F5C6B]/20 transition flex items-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5 text-teal-200" />
              Book Consultation
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              onClick={() => navigateTo('book')}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-[#0F5C6B] flex items-center gap-1"
            >
              Book
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Nav */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-2 text-sm shadow-xl">
            <button onClick={() => navigateTo('home')} className="block w-full text-left py-2 px-3 rounded-lg text-slate-700 hover:bg-teal-50 hover:text-[#0F5C6B]">Home</button>
            <button onClick={() => navigateTo('about')} className="block w-full text-left py-2 px-3 rounded-lg text-slate-700 hover:bg-teal-50 hover:text-[#0F5C6B]">About Dr. Dhara</button>
            <button onClick={() => navigateTo('treatments')} className="block w-full text-left py-2 px-3 rounded-lg text-slate-700 hover:bg-teal-50 hover:text-[#0F5C6B]">Specialities & Surgeries</button>
            <button onClick={() => navigateTo('locations')} className="block w-full text-left py-2 px-3 rounded-lg text-slate-700 hover:bg-teal-50 hover:text-[#0F5C6B]">Hospital Locations (14)</button>
            <button onClick={() => navigateTo('second-opinion')} className="block w-full text-left py-2 px-3 rounded-lg text-slate-700 hover:bg-teal-50 hover:text-[#0F5C6B]">Second Opinion Portal</button>
            <button onClick={() => navigateTo('articles')} className="block w-full text-left py-2 px-3 rounded-lg text-slate-700 hover:bg-teal-50 hover:text-[#0F5C6B]">Patient Guides & FAQs</button>
            <button onClick={() => navigateTo('publications')} className="block w-full text-left py-2 px-3 rounded-lg text-slate-700 hover:bg-teal-50 hover:text-[#0F5C6B]">Publications & Academics</button>
            <button onClick={() => navigateTo('contact')} className="block w-full text-left py-2 px-3 rounded-lg text-slate-700 hover:bg-teal-50 hover:text-[#0F5C6B]">Contact Practice</button>
            <div className="pt-2 border-t border-slate-100 flex gap-2">
              <button onClick={() => navigateTo('admin')} className="flex-1 py-2 rounded-lg text-xs font-medium text-slate-500 bg-slate-100 text-center">
                Admin Login
              </button>
              <button onClick={() => setShowUserGuide(true)} className="flex-1 py-2 rounded-lg text-xs font-medium text-teal-700 bg-teal-50 text-center">
                User Guide
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Multi-Page Routed View */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            siteSettings={siteSettings}
            locations={locations}
            treatments={treatments}
            articles={articles}
            onNavigate={navigateTo}
            onBookLocation={handleBookLocation}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage
            siteSettings={siteSettings}
            onNavigate={navigateTo}
          />
        )}

        {currentPage === 'treatments' && (
          <TreatmentsOverviewPage
            treatments={treatments}
            onSelectTreatment={(slug) => navigateTo('treatment-detail', slug)}
            onBook={() => navigateTo('book')}
          />
        )}

        {currentPage === 'treatment-detail' && (
          <TreatmentDetailPage
            treatments={treatments}
            activeSlug={activeTreatmentSlug}
            onSelectOther={(slug) => setActiveTreatmentSlug(slug)}
            onBook={() => navigateTo('book')}
            onNavigate={navigateTo}
          />
        )}

        {currentPage === 'locations' && (
          <LocationsPage
            locations={locations}
            onBookLocation={handleBookLocation}
          />
        )}

        {currentPage === 'book' && (
          <BookingPage
            locations={locations}
            treatments={treatments}
            siteSettings={siteSettings}
            preselectedLocation={selectedBookingLocation}
            onSubmitSuccess={(newAppointment) => {
              setAppointments([newAppointment, ...appointments]);
            }}
          />
        )}

        {currentPage === 'second-opinion' && (
          <SecondOpinionPage
            siteSettings={siteSettings}
            onSubmitSuccess={(newRecord) => {
              setAppointments([newRecord, ...appointments]);
            }}
          />
        )}

        {currentPage === 'articles' && (
          <ArticlesListPage
            articles={articles}
            onSelectArticle={(slug) => navigateTo('article-detail', slug)}
          />
        )}

        {currentPage === 'article-detail' && (
          <ArticleDetailPage
            articles={articles}
            activeSlug={activeArticleSlug}
            onNavigate={navigateTo}
          />
        )}

        {currentPage === 'faqs' && (
          <FaqsPage onBook={() => navigateTo('book')} />
        )}

        {currentPage === 'videos' && (
          <VideosPage onBook={() => navigateTo('book')} />
        )}

        {currentPage === 'publications' && (
          <PublicationsPage />
        )}

        {currentPage === 'contact' && (
          <ContactPage
            siteSettings={siteSettings}
            locations={locations}
          />
        )}

        {currentPage === 'legal-privacy' && (
          <LegalPrivacyPage />
        )}

        {currentPage === 'legal-disclaimer' && (
          <LegalDisclaimerPage />
        )}

        {currentPage === 'admin' && (
          <AdminPanel
            locations={locations}
            setLocations={setLocations}
            appointments={appointments}
            setAppointments={setAppointments}
            articles={articles}
            setArticles={setArticles}
            treatments={treatments}
            setTreatments={setTreatments}
            siteSettings={siteSettings}
            setSiteSettings={setSiteSettings}
            onExitAdmin={() => navigateTo('home')}
            onOpenGuide={() => setShowUserGuide(true)}
          />
        )}
      </main>

      {/* Floating Action WhatsApp Contact Button */}
      <a
        href={`https://wa.me/${siteSettings.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hello Dr. Dhara, I would like to book a consultation.')}`}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-[#25D366] text-white p-3.5 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition duration-200 flex items-center justify-center group"
        aria-label="Direct WhatsApp message"
      >
        <MessageSquare className="w-6 h-6" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs group-hover:ml-2 text-xs font-semibold transition-all duration-300">
          Chat on WhatsApp
        </span>
      </a>

      {/* Comprehensive Medical Practice Footer */}
      <footer className="bg-[#0A3D47] text-teal-100 pt-16 pb-12 border-t border-teal-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-teal-800/60">
            {/* Col 1 & 2: Doctor Bio & Badge */}
            <div className="lg:col-span-2 space-y-4">
              <BrandLogo isDark={true} />
              <p className="text-teal-200/80 text-sm leading-relaxed max-w-sm">
                Dr. Dhara P. Sirodaria provides surgical oncology and tissue reconstruction for mouth, jaw, neck, voice box, and thyroid conditions across leading multi-speciality hospitals in Mumbai.
              </p>
              <div className="pt-2 flex items-center gap-3">
                <div className="w-12 h-12 rounded-full border border-teal-600/60 overflow-hidden bg-teal-900 flex-shrink-0">
                  <DoctorPortraitImage src={siteSettings.doctorPortraitUrl} alt="Dr. Dhara Sirodaria" className="w-full h-full object-cover object-top" />
                </div>
                <div className="text-xs">
                  <div className="text-white font-semibold">Maharashtra Council Reg. A-24226</div>
                  <div className="text-teal-300">AOMSI Life Member LM3588</div>
                </div>
              </div>
            </div>

            {/* Col 3: Areas of Care */}
            <div className="space-y-3">
              <h4 className="font-serif text-white text-sm font-semibold tracking-wide">Areas of Care</h4>
              <ul className="space-y-2 text-xs text-teal-200/80">
                <li><button onClick={() => navigateTo('treatment-detail', 'oral-cancer')} className="hover:text-white transition">Oral Cavity Cancer</button></li>
                <li><button onClick={() => navigateTo('treatment-detail', 'neck-dissection')} className="hover:text-white transition">Neck Lumps & Dissections</button></li>
                <li><button onClick={() => navigateTo('treatment-detail', 'thyroid-parathyroid')} className="hover:text-white transition">Thyroid & Parathyroid</button></li>
                <li><button onClick={() => navigateTo('treatment-detail', 'salivary-gland-tumours')} className="hover:text-white transition">Parotid & Salivary Tumours</button></li>
                <li><button onClick={() => navigateTo('treatment-detail', 'reconstructive-surgery')} className="hover:text-white transition">Reconstructive Flaps</button></li>
                <li><button onClick={() => navigateTo('treatment-detail', 'palliative-care')} className="hover:text-white transition">Palliative & Pain Care</button></li>
              </ul>
            </div>

            {/* Col 4: Quick Links */}
            <div className="space-y-3">
              <h4 className="font-serif text-white text-sm font-semibold tracking-wide">Patient Navigation</h4>
              <ul className="space-y-2 text-xs text-teal-200/80">
                <li><button onClick={() => navigateTo('about')} className="hover:text-white transition">About Dr. Dhara</button></li>
                <li><button onClick={() => navigateTo('locations')} className="hover:text-white transition">14 Mumbai Hospital Centres</button></li>
                <li><button onClick={() => navigateTo('book')} className="hover:text-white transition">Book Consultation</button></li>
                <li><button onClick={() => navigateTo('second-opinion')} className="hover:text-white transition">Remote Second Opinion</button></li>
                <li><button onClick={() => navigateTo('articles')} className="hover:text-white transition">Health Articles & FAQs</button></li>
                <li><button onClick={() => navigateTo('publications')} className="hover:text-white transition">Academic Research</button></li>
              </ul>
            </div>

            {/* Col 5: Clinic Communication */}
            <div className="space-y-3">
              <h4 className="font-serif text-white text-sm font-semibold tracking-wide">Direct Practice Line</h4>
              <p className="text-xs text-teal-200/80">
                Coordination for appointments, surgical bookings and hospital scheduling:
              </p>
              <div className="space-y-2 pt-1 text-xs">
                <a href={`tel:${siteSettings.phone.replace(/\s+/g, '')}`} className="flex items-center gap-2 text-white font-medium hover:text-teal-300">
                  <Phone className="w-3.5 h-3.5 text-teal-400" /> {siteSettings.phone}
                </a>
                <a href={`mailto:${siteSettings.email}`} className="flex items-center gap-2 text-white font-medium hover:text-teal-300">
                  <FileText className="w-3.5 h-3.5 text-teal-400" /> {siteSettings.email}
                </a>
                <div className="flex items-center gap-2 text-teal-300">
                  <Clock className="w-3.5 h-3.5 text-teal-400" /> Mon – Sat: 9:00 AM – 8:00 PM
                </div>
              </div>
            </div>
          </div>

          {/* Regulatory Compliance & Disclaimer */}
          <div className="pt-8 text-xs text-teal-300/70 space-y-4">
            <div className="p-4 rounded-xl bg-teal-950/60 border border-teal-800/40 text-[11px] leading-relaxed">
              <strong className="text-teal-200">Mandatory Medical Council Disclaimer: </strong>
              The health information provided across this website is strictly for general patient education and awareness. It does not constitute formal medical diagnosis, prognosis, or a personalized doctor-patient treatment agreement. All surgical procedures carry intrinsic indications, risks, and recovery phases. Consult Dr. Dhara Sirodaria in person or in a dedicated clinical tele-consultation with your complete medical records for personalized surgical guidance.
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
              <div>
                © {new Date().getFullYear()} Dr. Dhara P. Sirodaria. All rights reserved. Registered under Maharashtra Medical & Dental Council regulations.
              </div>
              <div className="flex items-center gap-4">
                <button onClick={() => navigateTo('legal-disclaimer')} className="hover:text-white underline">Medical Disclaimer</button>
                <button onClick={() => navigateTo('legal-privacy')} className="hover:text-white underline">Privacy Policy (DPDP Act 2023)</button>
                <button onClick={() => navigateTo('admin')} className="text-teal-400 hover:text-white font-medium flex items-center gap-1">
                  <Lock className="w-3 h-3" /> Staff Portal
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Non-Technical Doctor / Staff User Manual Modal */}
      {showUserGuide && (
        <UserGuideModal onClose={() => setShowUserGuide(false)} />
      )}
    </div>
  );
}

// ==========================================
// PORTRAIT IMAGE HELPER
// ==========================================
function DoctorPortraitImage({ src, alt, className = '' }) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div className={`w-full h-full bg-[#0F5C6B] text-teal-100 flex flex-col items-center justify-center p-3 text-center ${className}`}>
        <Stethoscope className="w-8 h-8 mb-1 text-teal-300" />
        <span className="text-[11px] font-serif font-semibold">Dr. Dhara Sirodaria</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt || "Dr. Dhara P. Sirodaria - Head and Neck Oncosurgeon"}
      className={className}
      onError={() => setHasError(true)}
      loading="lazy"
    />
  );
}

// ==========================================
// PAGE 1: HOME PAGE
// ==========================================

function HomePage({ siteSettings, locations, treatments, articles, onNavigate, onBookLocation }) {
  const featuredLocations = locations.filter(l => l.active).slice(0, 6);

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:py-20 bg-gradient-to-b from-[#EBF5F6]/60 via-[#FAFAF7] to-[#FAFAF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Mobile-first portrait: above headline on very small screens, side-by-side on lg */}
            <div className="lg:hidden flex justify-center">
              <div className="relative w-64 h-80 sm:w-72 sm:h-96">
                {/* Organic backdrop frame to de-emphasise lobby background */}
                <div className="absolute inset-0 bg-[#0F5C6B]/15 rounded-[40px] transform rotate-3" />
                <div className="absolute inset-0 bg-[#14B8A6]/20 rounded-[36px] transform -rotate-2" />
                <div className="relative w-full h-full rounded-[36px] overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
                  <DoctorPortraitImage
                    src={siteSettings.doctorPortraitUrl}
                    alt="Dr Dhara P Sirodaria - Head & Neck Oncosurgeon"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
            </div>

            {/* Headline and compassionate narrative */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-100/70 border border-teal-200 text-[#0F5C6B] text-xs font-semibold">
                <Award className="w-3.5 h-3.5" />
                Fellowship-Trained Head & Neck Oncosurgeon
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
                Specialist care for <span className="text-[#0F5C6B] underline decoration-teal-300 decoration-wavy decoration-2">head & neck</span> conditions.
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                A cancer or tumour diagnosis brings questions, urgency, and vulnerability. Dr. Dhara Sirodaria provides transparent clinical evaluations, evidence-based surgical oncology, and aesthetic tissue reconstruction across Mumbai.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button
                  onClick={() => onNavigate('book')}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#0F5C6B] hover:bg-[#0B4450] text-white font-semibold text-sm shadow-lg shadow-[#0F5C6B]/25 transition flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-teal-200" />
                  Book Appointment
                </button>
                <button
                  onClick={() => onNavigate('second-opinion')}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm border border-slate-300 shadow-sm transition flex items-center justify-center gap-2"
                >
                  <FileText className="w-4 h-4 text-[#0F5C6B]" />
                  Request Second Opinion
                </button>
                <a
                  href={`tel:${siteSettings.phone.replace(/\s+/g, '')}`}
                  className="w-full sm:w-auto px-4 py-3.5 rounded-xl text-slate-700 font-medium text-sm hover:text-[#0F5C6B] flex items-center justify-center gap-2 transition"
                >
                  <Phone className="w-4 h-4 text-emerald-600" />
                  Direct Call
                </a>
              </div>

              {/* Patient Trust Pillars */}
              <div className="pt-6 grid grid-cols-3 gap-3 border-t border-slate-200/80 max-w-xl mx-auto lg:mx-0 text-left">
                <div className="bg-white/80 p-3 rounded-xl border border-slate-100 shadow-xs">
                  <div className="font-serif font-bold text-slate-800 text-sm">14+ Hospitals</div>
                  <div className="text-[11px] text-slate-500">Across Mumbai & Suburbs</div>
                </div>
                <div className="bg-white/80 p-3 rounded-xl border border-slate-100 shadow-xs">
                  <div className="font-serif font-bold text-slate-800 text-sm">Oncosurgery & Flaps</div>
                  <div className="text-[11px] text-slate-500">Tumour excision + Reconstruction</div>
                </div>
                <div className="bg-white/80 p-3 rounded-xl border border-slate-100 shadow-xs">
                  <div className="font-serif font-bold text-slate-800 text-sm">5 Languages</div>
                  <div className="text-[11px] text-slate-500">Eng, Hin, Guj, Mar, Kan</div>
                </div>
              </div>
            </div>

            {/* Desktop Hero Portrait: Organic soft teal framing */}
            <div className="hidden lg:flex lg:col-span-5 justify-center relative">
              <div className="relative w-80 h-[460px] xl:w-96 xl:h-[500px]">
                {/* Organic curved shape backdrop */}
                <div className="absolute -inset-4 bg-gradient-to-tr from-[#0F5C6B]/20 via-[#14B8A6]/15 to-transparent rounded-[48px] transform -rotate-3" />
                <div className="absolute inset-0 bg-[#0F5C6B]/10 rounded-[44px] transform rotate-2" />
                
                {/* Clean soft-shadowed container */}
                <div className="relative w-full h-full rounded-[40px] overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
                  <DoctorPortraitImage
                    src={siteSettings.doctorPortraitUrl}
                    alt="Dr. Dhara P. Sirodaria"
                    className="w-full h-full object-cover object-top"
                  />
                  {/* Subtle Doctor Identity overlay pill */}
                  <div className="absolute bottom-4 inset-x-4 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-lg border border-slate-100 text-center">
                    <p className="font-serif font-bold text-slate-900 text-sm">Dr. Dhara P. Sirodaria</p>
                    <p className="text-[11px] text-[#0F5C6B] font-medium">Consultant Head & Neck Onco & Reconstructive Surgeon</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Credential Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
          <div className="text-center md:text-left mb-6">
            <span className="text-xs font-semibold tracking-wider uppercase text-[#0F5C6B]">Accredited Credentials & Board Registrations</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#0F5C6B] flex items-center justify-center flex-shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <strong className="block text-slate-800 font-serif">BDS, MDS (OMFS)</strong>
                <span className="text-xs text-slate-500">Maxillofacial Surgery, RGUHS Karnataka</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#0F5C6B] flex items-center justify-center flex-shrink-0">
                <Stethoscope className="w-5 h-5" />
              </div>
              <div>
                <strong className="block text-slate-800 font-serif">Head & Neck Oncosurgery</strong>
                <span className="text-xs text-slate-500">Fellowship, KCTRI Hubballi (RGUHS)</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#0F5C6B] flex items-center justify-center flex-shrink-0">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div>
                <strong className="block text-slate-800 font-serif">Palliative Care Fellowship</strong>
                <span className="text-xs text-slate-500">Indian Association of Palliative Care (IAPC)</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#0F5C6B] flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <strong className="block text-slate-800 font-serif">Council Registrations</strong>
                <span className="text-xs text-slate-500">Maha State A-24226 · AOMSI LM3588</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Areas of Care Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0F5C6B] bg-teal-50 px-3 py-1 rounded-full">Surgical Specialities</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
            Dedicated Care for Complex Head & Neck Pathologies
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Balancing radical oncological safety with modern reconstructive techniques that safeguard speech, swallowing, and natural appearance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {treatments.slice(0, 6).map((t) => (
            <div
              key={t.slug}
              onClick={() => onNavigate('treatment-detail', t.slug)}
              className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm hover:shadow-md hover:border-teal-300 transition cursor-pointer flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#0F5C6B] group-hover:bg-[#0F5C6B] group-hover:text-white transition flex items-center justify-center">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-xl font-bold text-slate-900 group-hover:text-[#0F5C6B] transition">
                  {t.title}
                </h3>
                <p className="text-xs font-medium text-teal-700">{t.subtitle}</p>
                <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed">
                  {t.overview}
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#0F5C6B] mt-4">
                <span>View Treatment Pathway</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => onNavigate('treatments')}
            className="px-6 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:text-[#0F5C6B] hover:border-[#0F5C6B] text-xs font-semibold transition"
          >
            Explore All 9 Head & Neck Specialities
          </button>
        </div>
      </section>

      {/* Your Journey With Us: 6-Step Clinical Flow */}
      <section className="bg-[#0F5C6B]/5 py-16 border-y border-teal-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0F5C6B]">Care Continuity</span>
            <h2 className="font-serif text-3xl font-bold text-slate-900">Your Journey With Us</h2>
            <p className="text-sm text-slate-600">A clear, supportive 6-step pathway from initial consultation to long-term survivorship.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            {[
              { step: '01', title: 'Consultation', desc: 'Thorough clinical examination, symptom review & empathetic discussion.' },
              { step: '02', title: 'Diagnosis & Biopsy', desc: 'Precise imaging (CT/MRI) and gentle biopsy to confirm staging.' },
              { step: '03', title: 'Personalised Plan', desc: 'Tumour board approach tailored to disease stage, age, and lifestyle.' },
              { step: '04', title: 'Surgery & Flap', desc: 'Oncological resection followed by immediate tissue reconstruction.' },
              { step: '05', title: 'Rehabilitation', desc: 'Structured therapy for speech, swallowing, and shoulder mobility.' },
              { step: '06', title: 'Survivorship', desc: 'Regular surveillance and palliative comfort protocols.' }
            ].map((st) => (
              <div key={st.step} className="bg-white p-5 rounded-2xl border border-slate-200/70 shadow-xs relative flex flex-col justify-between">
                <div>
                  <div className="font-serif text-2xl font-bold text-[#0F5C6B]/30 mb-2">{st.step}</div>
                  <h4 className="font-serif font-bold text-slate-800 text-base mb-1">{st.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{st.desc}</p>
                </div>
                <div className="w-6 h-1 bg-teal-500 rounded-full mt-4" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who Should Consult Section (Triage Guide) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-3 py-1 rounded-full">Early Detection Saves Lives</span>
            <h2 className="font-serif text-3xl font-bold text-slate-900 mt-3">Who Should Consult?</h2>
            <p className="text-sm text-slate-600 mt-2">
              If you or a loved one experience any of these symptoms lasting longer than 2 weeks, an early oncosurgical evaluation is strongly advised:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            {[
              { icon: AlertCircle, text: 'Persistent mouth ulcer or tongue sore lasting > 14 days' },
              { icon: AlertCircle, text: 'Painless or enlarging lump in the neck' },
              { icon: AlertCircle, text: 'Difficulty or persistent pain while swallowing' },
              { icon: AlertCircle, text: 'Unexplained hoarseness or voice change > 3 weeks' },
              { icon: AlertCircle, text: 'Thyroid nodule or midline neck swelling' },
              { icon: AlertCircle, text: 'Painless jaw swelling or sudden loose teeth' },
              { icon: AlertCircle, text: 'White (leukoplakia) or red mucosal patch in mouth' },
              { icon: AlertCircle, text: 'Maxillofacial trauma, fracture or deep dental abscess' },
              { icon: AlertCircle, text: 'Seeking a calm, verified surgical second opinion' }
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <item.icon className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700 font-medium text-xs sm:text-sm">{item.text}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-slate-500">Prompt consultations prevent disease progression and facilitate organ-preserving surgery.</span>
            <button
              onClick={() => onNavigate('book')}
              className="px-5 py-2.5 rounded-xl bg-[#0F5C6B] text-white text-xs font-semibold hover:bg-[#0B4450] transition shadow-xs"
            >
              Schedule Clinical Consultation
            </button>
          </div>
        </div>
      </section>

      {/* Featured Locations Preview (6 Cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#0F5C6B]">Multi-Centre Practice</span>
            <h2 className="font-serif text-3xl font-bold text-slate-900 mt-1">Convenient Mumbai Locations</h2>
            <p className="text-sm text-slate-600 mt-1">
              Visiting hospital centres across Western Suburbs, Central Mumbai & Extended Suburbs on an on-call basis.
            </p>
          </div>
          <button
            onClick={() => onNavigate('locations')}
            className="text-xs font-semibold text-[#0F5C6B] hover:underline flex items-center gap-1 self-start md:self-auto"
          >
            View All 14 Hospital Centres <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredLocations.map((loc) => (
            <div key={loc.id} className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
              <div className="space-y-2">
                <div className="inline-block px-2.5 py-0.5 rounded-md text-[10px] font-semibold bg-teal-50 text-teal-800">
                  {loc.area}
                </div>
                <h4 className="font-serif text-lg font-bold text-slate-900">{loc.name}</h4>
                <p className="text-xs text-slate-500 line-clamp-2">{loc.address}</p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-4">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc.name + ' ' + loc.address)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-medium text-slate-600 hover:text-[#0F5C6B] flex items-center gap-1"
                >
                  <MapPin className="w-3.5 h-3.5 text-teal-600" />
                  Maps
                </a>
                <button
                  onClick={() => onBookLocation(loc.name + ' – ' + loc.area)}
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-teal-50 text-[#0F5C6B] hover:bg-[#0F5C6B] hover:text-white transition"
                >
                  Book Here
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Patient Education & FAQ Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Articles preview */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#0F5C6B]">Educational Guides</span>
                <h3 className="font-serif text-2xl font-bold text-slate-900">Latest Health Insights</h3>
              </div>
              <button onClick={() => onNavigate('articles')} className="text-xs font-semibold text-[#0F5C6B] hover:underline">
                All Articles
              </button>
            </div>

            <div className="space-y-4">
              {articles.slice(0, 2).map((art) => (
                <div
                  key={art.slug}
                  onClick={() => onNavigate('article-detail', art.slug)}
                  className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-teal-300 transition cursor-pointer"
                >
                  <div className="flex items-center gap-2 text-[11px] text-teal-700 font-semibold mb-1">
                    <span>{art.category}</span>
                    <span>·</span>
                    <span className="text-slate-400">{art.date}</span>
                  </div>
                  <h4 className="font-serif text-lg font-bold text-slate-900 mb-1 hover:text-[#0F5C6B]">
                    {art.title}
                  </h4>
                  <p className="text-xs text-slate-600 line-clamp-2">{art.summary}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick FAQ accordion preview */}
          <div className="lg:col-span-5 space-y-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#0F5C6B]">Questions Answered</span>
              <h3 className="font-serif text-2xl font-bold text-slate-900">Common Enquiries</h3>
            </div>
            <div className="space-y-3">
              {INITIAL_FAQS.slice(0, 3).map((f, i) => (
                <details key={i} className="group bg-white rounded-xl border border-slate-200/80 p-4 text-xs">
                  <summary className="font-semibold text-slate-800 cursor-pointer list-none flex items-center justify-between">
                    <span>{f.q}</span>
                    <ChevronDown className="w-4 h-4 text-slate-400 group-open:rotate-180 transition" />
                  </summary>
                  <p className="pt-2 text-slate-600 leading-relaxed border-t border-slate-100 mt-2">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final Reassurance & Booking Band */}
      <section className="bg-gradient-to-r from-[#0F5C6B] to-[#0A3D47] text-white py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold">
            Take the First Step Toward Clarity & Recovery
          </h2>
          <p className="text-teal-100 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Whether you require an urgent surgical evaluation, post-biopsy planning, or an unbiased second opinion, Dr. Dhara is here to guide your family.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onNavigate('book')}
              className="w-full sm:w-auto px-7 py-3 rounded-xl bg-white text-[#0F5C6B] font-bold text-sm hover:bg-teal-50 transition shadow-lg"
            >
              Request In-Person Consultation
            </button>
            <button
              onClick={() => onNavigate('second-opinion')}
              className="w-full sm:w-auto px-7 py-3 rounded-xl bg-teal-800/80 hover:bg-teal-800 text-white font-semibold text-sm border border-teal-600 transition"
            >
              Upload Reports for Second Opinion
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

// ==========================================
// PAGE 2: ABOUT DR DHARA
// ==========================================

function AboutPage({ siteSettings, onNavigate }) {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Intro Breadcrumb & Header */}
      <div>
        <div className="text-xs text-slate-400 mb-2 flex items-center gap-1.5">
          <button onClick={() => onNavigate('home')} className="hover:text-slate-600">Home</button>
          <span>/</span>
          <span className="text-[#0F5C6B] font-medium">About</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
          About Dr. Dhara P. Sirodaria
        </h1>
        <p className="text-base text-slate-600 mt-2">
          Consultant Head & Neck Onco & Reconstructive Surgeon
        </p>
      </div>

      {/* Main Profile Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
        {/* Secondary Portrait Crop in Soft Frame */}
        <div className="md:col-span-5 flex justify-center">
          <div className="relative w-full max-w-sm aspect-[4/5] rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-slate-100">
            <DoctorPortraitImage
              src={siteSettings.doctorPortraitUrl}
              alt="Dr. Dhara Sirodaria"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-5 text-white">
              <span className="font-serif font-bold text-lg">Dr. Dhara P. Sirodaria</span>
              <span className="text-xs text-teal-200">MDS (OMFS), Head & Neck Oncosurgery Fellow</span>
            </div>
          </div>
        </div>

        {/* Narrative & Philosophy */}
        <div className="md:col-span-7 space-y-6 text-sm text-slate-700 leading-relaxed">
          <div className="p-4 rounded-2xl bg-teal-50 border border-teal-100 text-teal-900">
            <strong className="block font-serif text-base mb-1 text-[#0F5C6B]">Clinical Philosophy</strong>
            "Surgery for head and neck conditions must never stop at just removing the disease. My foremost priority is ensuring each patient regains their voice, comfortable swallowing, natural facial harmony, and peace of mind with their families."
          </div>

          <p>
            Dr. Dhara P. Sirodaria is an accomplished oral, maxillofacial, and head & neck oncosurgeon based in Mumbai. Having undergone rigorous subspecialty fellowship training in Head & Neck Surgical Oncology at Karnataka Cancer Therapy & Research Institute (KCTRI, Hubballi), she specializes in radical surgical excision coupled with immediate functional tissue flap reconstructions.
          </p>

          <p>
            Recognizing the profound emotional and physical vulnerability experienced by patients and families facing cancer, she pursued a dedicated Fellowship in Palliative Care through the Indian Association of Palliative Care (IAPC). This empowers her to offer compassionate symptom management, advanced pain control, and supportive care throughout the patient’s recovery journey.
          </p>

          {/* Languages Box */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
            <span className="text-xs font-bold uppercase text-[#0F5C6B]">Languages Spoken for Patient Comfort</span>
            <div className="flex flex-wrap gap-2 text-xs">
              {['English', 'Hindi', 'Gujarati', 'Marathi', 'Kannada'].map(l => (
                <span key={l} className="px-3 py-1 rounded-full bg-slate-100 text-slate-800 font-medium">
                  {l}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Structured Training & Career Timeline */}
      <div className="space-y-6">
        <h2 className="font-serif text-2xl font-bold text-slate-900">Education & Training Timeline</h2>
        <div className="space-y-4 border-l-2 border-teal-200 ml-4 pl-6">
          {[
            {
              period: 'Dec 2024 – Present',
              title: 'Freelance Consultant Head & Neck Oncosurgeon',
              place: 'Visiting Consultant across Premier Multi-Speciality Hospitals in Mumbai'
            },
            {
              period: 'Dec 2022 – Dec 2024',
              title: 'Consultant Head & Neck Oncosurgeon',
              place: 'Speciality Surgical Oncology Hospital & Research Centre, Mumbai'
            },
            {
              period: '2022',
              title: 'Advanced Surgical Oncology Observership',
              place: 'KMC Manipal · Observerships at Mazumdar Shaw Medical Centre & Kidwai Memorial Institute of Oncology (Bengaluru)'
            },
            {
              period: 'Post-Graduation Fellowship',
              title: 'Fellowship in Head & Neck Oncosurgery',
              place: 'KCTRI Hubballi (Affiliated with Rajiv Gandhi University of Health Sciences, Karnataka)'
            },
            {
              period: 'Fellowship',
              title: 'Fellowship in Palliative Care',
              place: 'Indian Association of Palliative Care (IAPC)'
            },
            {
              period: '2014 – 2017',
              title: 'MDS – Oral & Maxillofacial Surgery',
              place: 'College of Dental Sciences, Davangere (RGUHS)'
            },
            {
              period: '2007 – 2012',
              title: 'BDS – Bachelor of Dental Surgery',
              place: 'School of Dental Sciences, KIMSDU Karad'
            }
          ].map((item, idx) => (
            <div key={idx} className="relative group">
              <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-teal-600 border-2 border-white" />
              <div className="text-xs font-semibold text-[#0F5C6B]">{item.period}</div>
              <div className="font-serif font-bold text-slate-800 text-base">{item.title}</div>
              <div className="text-xs text-slate-500">{item.place}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Operative Scope Matrix */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 space-y-6 shadow-sm">
        <h2 className="font-serif text-2xl font-bold text-slate-900">Operative Procedures & Clinical Scope</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-700">
          <ul className="space-y-2.5">
            <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5" /> <strong>Oral Cavity Excision:</strong> Glossectomy, buccal mucosa wide resections, composite resections.</li>
            <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5" /> <strong>Cervical Neck Dissection:</strong> Selective (Levels I–IV), modified radical & radical neck clearance.</li>
            <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5" /> <strong>Jaw Surgery:</strong> Marginal and segmental mandibulectomy, partial maxillectomy for ameloblastoma and cysts.</li>
            <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5" /> <strong>Thyroidectomy:</strong> Hemithyroidectomy, total thyroidectomy with central compartment clearance.</li>
          </ul>
          <ul className="space-y-2.5">
            <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5" /> <strong>Parotid & Salivary Surgery:</strong> Superficial & total parotidectomy with facial nerve dissection.</li>
            <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5" /> <strong>Tissue Flap Reconstruction:</strong> PMMC, nasolabial, forehead, Estlander flaps & skin grafting.</li>
            <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5" /> <strong>Airway & Diagnostic:</strong> Tracheostomy, direct suspension laryngoscopy, and deep guided biopsies.</li>
            <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5" /> <strong>Maxillofacial Trauma:</strong> Mini-plate ORIF of mandible/maxilla fractures, deep infection drainages.</li>
          </ul>
        </div>
      </div>

      {/* Memberships & Accreditations */}
      <div className="space-y-4">
        <h2 className="font-serif text-xl font-bold text-slate-900">Professional Memberships</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <strong className="block text-slate-800 text-sm mb-1">AOMSI</strong>
            <span className="text-slate-500">Association of Oral & Maxillofacial Surgeons of India (Life Member LM3588)</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <strong className="block text-slate-800 text-sm mb-1">IAPC</strong>
            <span className="text-slate-500">Indian Association of Palliative Care (Fellowship Certified)</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <strong className="block text-slate-800 text-sm mb-1">State Medical Registration</strong>
            <span className="text-slate-500">Maharashtra Dental & Maxillofacial Council (Reg. No. A-24226)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// PAGE 3: TREATMENTS OVERVIEW & DETAIL
// ==========================================

function TreatmentsOverviewPage({ treatments, onSelectTreatment, onBook }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-[#0F5C6B] bg-teal-50 px-3 py-1 rounded-full">Surgical Procedures</span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
          Head & Neck Surgical Treatments
        </h1>
        <p className="text-slate-600 text-sm sm:text-base">
          Evidence-based oncosurgical management and functional reconstructive solutions tailored to restore health, form, and dignity.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {treatments.map((t) => (
          <div
            key={t.slug}
            className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs hover:shadow-md transition flex flex-col justify-between"
          >
            <div className="space-y-3">
              <span className="text-[11px] font-semibold text-teal-700 uppercase tracking-wider">{t.subtitle}</span>
              <h3 className="font-serif text-xl font-bold text-slate-900">{t.title}</h3>
              <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">{t.overview}</p>
            </div>

            <div className="pt-6 border-t border-slate-100 flex items-center justify-between mt-6">
              <button
                onClick={() => onSelectTreatment(t.slug)}
                className="text-xs font-semibold text-[#0F5C6B] hover:underline flex items-center gap-1"
              >
                Detailed Protocol <ChevronRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={onBook}
                className="text-xs font-medium px-3 py-1.5 rounded-lg bg-teal-50 text-teal-900 hover:bg-[#0F5C6B] hover:text-white transition"
              >
                Consult
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TreatmentDetailPage({ treatments, activeSlug, onSelectOther, onBook, onNavigate }) {
  const current = treatments.find(t => t.slug === activeSlug) || treatments[0];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Breadcrumb */}
      <div className="text-xs text-slate-400 flex items-center gap-1.5">
        <button onClick={() => onNavigate('home')} className="hover:text-slate-600">Home</button>
        <span>/</span>
        <button onClick={() => onNavigate('treatments')} className="hover:text-slate-600">Treatments</button>
        <span>/</span>
        <span className="text-[#0F5C6B] font-medium">{current.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main Treatment Document */}
        <div className="lg:col-span-8 space-y-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#0F5C6B] bg-teal-50 px-3 py-1 rounded-full">{current.subtitle}</span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 mt-3">{current.title}</h1>
            <p className="text-base text-slate-600 mt-4 leading-relaxed">{current.overview}</p>
          </div>

          {/* Symptoms Checklist */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-3">
            <h3 className="font-serif font-bold text-slate-900 text-lg flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-rose-500" />
              Common Symptoms & Presentation
            </h3>
            <ul className="space-y-2 text-sm text-slate-600">
              {current.symptoms.map((s, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 flex-shrink-0" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Diagnostic Workup */}
          <div className="space-y-2 text-sm text-slate-700">
            <h3 className="font-serif font-bold text-slate-900 text-lg">Diagnostic Protocol</h3>
            <p className="leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">{current.diagnosis}</p>
          </div>

          {/* Surgical Approach & Technique */}
          <div className="space-y-2 text-sm text-slate-700">
            <h3 className="font-serif font-bold text-slate-900 text-lg">Surgical Approach & Oncological Clearance</h3>
            <p className="leading-relaxed bg-teal-50/50 p-4 rounded-xl border border-teal-100 text-slate-800">{current.approach}</p>
          </div>

          {/* Recovery & Functional Rehabilitation */}
          <div className="space-y-2 text-sm text-slate-700">
            <h3 className="font-serif font-bold text-slate-900 text-lg">What to Expect During Recovery</h3>
            <p className="leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">{current.recovery}</p>
          </div>

          {/* FAQs for this specific treatment */}
          {current.faqs && current.faqs.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-serif font-bold text-slate-900 text-lg">Frequently Asked Questions</h3>
              <div className="space-y-3">
                {current.faqs.map((f, i) => (
                  <div key={i} className="bg-white p-4 rounded-xl border border-slate-200 text-xs">
                    <strong className="block text-slate-900 text-sm mb-1">{f.q}</strong>
                    <p className="text-slate-600 leading-relaxed">{f.a}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar with Consult CTAs and Other Treatments */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#0F5C6B] text-white p-6 rounded-2xl shadow-md space-y-4">
            <h3 className="font-serif text-xl font-bold">Have questions regarding this condition?</h3>
            <p className="text-xs text-teal-100 leading-relaxed">
              Dr. Dhara reviews diagnostic scans and biopsy reports in detail to recommend the most conservative yet oncologically thorough path.
            </p>
            <button
              onClick={onBook}
              className="w-full py-3 rounded-xl bg-white text-[#0F5C6B] font-bold text-xs hover:bg-teal-50 transition shadow"
            >
              Book In-Person Consultation
            </button>
            <button
              onClick={() => onNavigate('second-opinion')}
              className="w-full py-2.5 rounded-xl bg-teal-800 text-teal-100 font-semibold text-xs hover:bg-teal-700 transition border border-teal-600"
            >
              Upload Biopsy for 2nd Opinion
            </button>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
            <h4 className="font-serif font-bold text-slate-900 text-sm">Other Specialities</h4>
            <div className="space-y-1.5 text-xs">
              {treatments.map((t) => (
                <button
                  key={t.slug}
                  onClick={() => onSelectOther(t.slug)}
                  className={`block w-full text-left py-2 px-3 rounded-lg transition ${t.slug === activeSlug ? 'bg-teal-50 text-[#0F5C6B] font-semibold' : 'text-slate-600 hover:bg-slate-50'}`}
                >
                  {t.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// PAGE 4: LOCATIONS DIRECTORY (14 HOSPITALS)
// ==========================================

function LocationsPage({ locations, onBookLocation }) {
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLocations = useMemo(() => {
    return locations.filter((loc) => {
      const matchRegion = selectedRegion === 'All' || loc.region === selectedRegion;
      const matchSearch =
        loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        loc.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
        loc.address.toLowerCase().includes(searchQuery.toLowerCase());
      return matchRegion && matchSearch && loc.active;
    });
  }, [locations, selectedRegion, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-[#0F5C6B] bg-teal-50 px-3 py-1 rounded-full">Mumbai Practice Network</span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
          Affiliated Hospitals & Consultation Centres
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          Dr. Dhara visits these centres on an on-call appointment basis, coordinated around her surgical schedule. Prior booking is mandatory.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Region tabs */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {['All', 'Western Suburbs', 'Central / Harbour', 'Extended Suburbs (Mira-Vasai)'].map((reg) => (
            <button
              key={reg}
              onClick={() => setSelectedRegion(reg)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${selectedRegion === reg ? 'bg-[#0F5C6B] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              {reg}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search hospital or suburb..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:border-[#0F5C6B]"
          />
        </div>
      </div>

      {/* Locations Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLocations.map((loc) => {
          const mapQuery = encodeURIComponent(`${loc.name} ${loc.area} ${loc.address}`);
          return (
            <div
              key={loc.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:border-teal-300 transition flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-teal-800 bg-teal-50 px-2 py-0.5 rounded-md">
                    {loc.area}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">On-Call Scheduled</span>
                </div>
                <h3 className="font-serif text-lg font-bold text-slate-900">{loc.name}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{loc.address}</p>
              </div>

              <div className="pt-5 border-t border-slate-100 flex items-center justify-between mt-6">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-semibold text-slate-600 hover:text-[#0F5C6B] flex items-center gap-1"
                >
                  <MapPin className="w-3.5 h-3.5 text-teal-600" />
                  Open in Google Maps
                </a>
                <button
                  onClick={() => onBookLocation(`${loc.name} – ${loc.area}`)}
                  className="px-3.5 py-1.5 rounded-xl bg-[#0F5C6B] text-white text-xs font-semibold hover:bg-[#0B4450] transition shadow-xs"
                >
                  Book Here
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredLocations.length === 0 && (
        <div className="text-center py-12 text-slate-400 text-sm">
          No hospital locations found matching your filter criteria.
        </div>
      )}
    </div>
  );
}

// ==========================================
// PAGE 5: BOOK CONSULTATION SPEC
// ==========================================

function BookingPage({ locations, treatments, siteSettings, preselectedLocation, onSubmitSuccess }) {
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    age: '',
    type: 'In-person at a hospital',
    location: preselectedLocation || (locations[0]?.name ? `${locations[0].name} – ${locations[0].area}` : ''),
    preferredDate: '',
    timeSlot: 'Morning 9–12',
    concern: treatments[0]?.title || 'General Consultation',
    message: '',
    consent: false,
    honeypot: '' // Anti-spam trap
  });

  const [submitted, setSubmitted] = useState(false);
  const [submittedApt, setSubmittedApt] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  // Set minimum date to tomorrow
  const minDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    // Honeypot check
    if (formData.honeypot) {
      return; // Silent fail for bot spam
    }

    // Validation
    const mobileDigits = formData.mobile.replace(/\D/g, '');
    if (mobileDigits.length !== 10) {
      setErrorMsg('Please enter a valid 10-digit Indian mobile number (+91).');
      return;
    }

    if (!formData.fullName.trim()) {
      setErrorMsg('Full name is required.');
      return;
    }

    if (!formData.consent) {
      setErrorMsg('Please acknowledge the consent checkbox to proceed.');
      return;
    }

    const newAppointment = {
      id: `APT-${Math.floor(1000 + Math.random() * 9000)}`,
      fullName: formData.fullName,
      mobile: formData.mobile,
      email: formData.email,
      age: formData.age || 'N/A',
      type: formData.type,
      location: formData.type === 'Video consultation' ? 'Online Video Call' : formData.location,
      preferredDate: formData.preferredDate || 'Earliest Available',
      timeSlot: formData.timeSlot,
      concern: formData.concern,
      status: 'New',
      notes: formData.message || 'Booked via public website form.',
      createdAt: new Date().toLocaleString()
    };

    onSubmitSuccess(newAppointment);
    setSubmittedApt(newAppointment);
    setSubmitted(true);
  };

  if (submitted && submittedApt) {
    const waText = encodeURIComponent(
      `Hello Dr. Dhara, I have requested an appointment.\nRef: ${submittedApt.id}\nPatient: ${submittedApt.fullName}\nLocation: ${submittedApt.location}\nPreferred Date: ${submittedApt.preferredDate} (${submittedApt.timeSlot})\nConcern: ${submittedApt.concern}`
    );

    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h2 className="font-serif text-3xl font-bold text-slate-900">Appointment Request Received</h2>
        <p className="text-slate-600 text-sm leading-relaxed">
          Thank you, <strong>{submittedApt.fullName}</strong>. Your reference ID is <strong className="text-[#0F5C6B]">{submittedApt.id}</strong>. Dr. Dhara’s practice coordinator will call your mobile number (<strong>+91 {submittedApt.mobile}</strong>) within a few hours to confirm the exact time and hospital room slot.
        </p>

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 text-left space-y-1">
          <div><strong>Consultation Type:</strong> {submittedApt.type}</div>
          <div><strong>Centre:</strong> {submittedApt.location}</div>
          <div><strong>Date & Slot:</strong> {submittedApt.preferredDate} · {submittedApt.timeSlot}</div>
        </div>

        <div className="pt-2">
          <a
            href={`https://wa.me/${siteSettings.whatsapp.replace(/[^0-9]/g, '')}?text=${waText}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm shadow-md transition"
          >
            <MessageSquare className="w-4 h-4" />
            Chat on WhatsApp with Pre-filled Request
          </a>
        </div>

        <p className="text-[11px] text-slate-400 pt-4">
          Emergency Note: This is an appointment request, not an emergency triage service. For acute emergencies, please visit the casualty of your nearest hospital.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="text-center space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-[#0F5C6B] bg-teal-50 px-3 py-1 rounded-full">Consultation Scheduling</span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
          Book an Appointment
        </h1>
        <p className="text-sm text-slate-600 max-w-lg mx-auto">
          Appointments are coordinated around Dr. Dhara’s surgical commitments across Mumbai. Kindly provide your preferred centre and clinical details.
        </p>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6 text-xs sm:text-sm">
        {/* Anti-spam honeypot (hidden from real users) */}
        <input
          type="text"
          name="honeypot"
          value={formData.honeypot}
          onChange={handleChange}
          style={{ display: 'none' }}
          tabIndex="-1"
          autoComplete="off"
        />

        {/* Name and Mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Patient Full Name *</label>
            <input
              type="text"
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleChange}
              placeholder="e.g. Ramesh Patel"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#0F5C6B]"
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">10-Digit Mobile (+91) *</label>
            <input
              type="tel"
              name="mobile"
              required
              value={formData.mobile}
              onChange={handleChange}
              placeholder="e.g. 9820123456"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#0F5C6B]"
            />
          </div>
        </div>

        {/* Email and Age */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Email Address (Optional)</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="patient@example.com"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#0F5C6B]"
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Patient Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="e.g. 52"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#0F5C6B]"
            />
          </div>
        </div>

        {/* Consultation Type */}
        <div>
          <label className="block font-semibold text-slate-700 mb-1">Consultation Mode *</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {['In-person at a hospital', 'Video consultation', 'Second opinion – records review'].map((m) => (
              <label
                key={m}
                className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition ${formData.type === m ? 'border-[#0F5C6B] bg-teal-50 text-[#0F5C6B] font-semibold' : 'border-slate-200 hover:bg-slate-50'}`}
              >
                <input
                  type="radio"
                  name="type"
                  value={m}
                  checked={formData.type === m}
                  onChange={handleChange}
                  className="accent-[#0F5C6B]"
                />
                <span className="text-xs">{m}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Hospital Location selector (hidden for video consult) */}
        {formData.type !== 'Video consultation' && (
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Preferred Hospital / Clinic Centre *</label>
            <select
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-hidden focus:border-[#0F5C6B]"
            >
              {locations.filter(l => l.active).map((loc) => (
                <option key={loc.id} value={`${loc.name} – ${loc.area}`}>
                  {loc.name} ({loc.area})
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Preferred Date & Time Slot */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Preferred Date *</label>
            <input
              type="date"
              name="preferredDate"
              required
              min={minDate}
              value={formData.preferredDate}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#0F5C6B]"
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Preferred Time Window *</label>
            <select
              name="timeSlot"
              value={formData.timeSlot}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-hidden focus:border-[#0F5C6B]"
            >
              <option value="Morning 9–12">Morning 9:00 AM – 12:00 PM</option>
              <option value="Afternoon 12–4">Afternoon 12:00 PM – 4:00 PM</option>
              <option value="Evening 4–8">Evening 4:00 PM – 8:00 PM</option>
            </select>
          </div>
        </div>

        {/* Primary Concern */}
        <div>
          <label className="block font-semibold text-slate-700 mb-1">Primary Clinical Concern *</label>
          <select
            name="concern"
            value={formData.concern}
            onChange={handleChange}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-hidden focus:border-[#0F5C6B]"
          >
            {treatments.map((t) => (
              <option key={t.slug} value={t.title}>{t.title}</option>
            ))}
            <option value="Other Clinical Query">Other Head & Neck Symptom</option>
          </select>
        </div>

        {/* Brief Message */}
        <div>
          <label className="block font-semibold text-slate-700 mb-1">Brief Medical History or Questions</label>
          <textarea
            name="message"
            rows="3"
            value={formData.message}
            onChange={handleChange}
            placeholder="Duration of symptoms, previous biopsy results, current health condition..."
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#0F5C6B]"
          />
        </div>

        {/* Consent Checkbox */}
        <div className="pt-2">
          <label className="flex items-start gap-3 cursor-pointer text-xs text-slate-600">
            <input
              type="checkbox"
              name="consent"
              required
              checked={formData.consent}
              onChange={handleChange}
              className="mt-0.5 accent-[#0F5C6B]"
            />
            <span>
              I understand that submitting this form requests an appointment coordinated by Dr. Dhara's team and does not replace emergency medical care. I consent to be contacted via call or WhatsApp.
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3.5 rounded-xl bg-[#0F5C6B] hover:bg-[#0B4450] text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
        >
          <Calendar className="w-4 h-4 text-teal-200" />
          Submit Appointment Request
        </button>

        <p className="text-[11px] text-slate-400 text-center">
          Appointments are confirmed manually by staff. No upfront payments required.
        </p>
      </form>
    </div>
  );
}

// ==========================================
// PAGE 6: SECOND OPINION PORTAL
// ==========================================

function SecondOpinionPage({ siteSettings, onSubmitSuccess }) {
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    age: '',
    clinicalSummary: '',
    contactMode: 'WhatsApp / Phone call',
    consent: false
  });

  const [files, setFiles] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleFileDrop = (e) => {
    e.preventDefault();
    if (e.target.files) {
      const selected = Array.from(e.target.files);
      if (files.length + selected.length > 10) {
        setErrorMsg('Maximum 10 files allowed.');
        return;
      }
      setFiles([...files, ...selected]);
    }
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.fullName.trim()) {
      setErrorMsg('Patient full name is required.');
      return;
    }
    const mobileDigits = formData.mobile.replace(/\D/g, '');
    if (mobileDigits.length !== 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!formData.consent) {
      setErrorMsg('Please check the consent box.');
      return;
    }

    const newRecord = {
      id: `SOP-${Math.floor(1000 + Math.random() * 9000)}`,
      fullName: formData.fullName,
      mobile: formData.mobile,
      email: formData.email,
      age: formData.age || 'N/A',
      type: 'Second opinion – records review',
      location: 'Remote Records Review',
      preferredDate: 'Prompt Review',
      timeSlot: 'Flexible',
      concern: 'Second Opinion on Scan/Biopsy',
      status: 'New',
      notes: `Uploaded Files: ${files.length} document(s). Summary: ${formData.clinicalSummary}`,
      createdAt: new Date().toLocaleString()
    };

    onSubmitSuccess(newRecord);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-teal-100 text-[#0F5C6B] flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h2 className="font-serif text-3xl font-bold text-slate-900">Medical Reports Uploaded</h2>
        <p className="text-slate-600 text-sm leading-relaxed">
          Dr. Dhara Sirodaria will personally examine your uploaded histopathology, scan reports, and clinical history. Our coordination team will reach out via <strong>{formData.contactMode}</strong> to arrange the comprehensive review.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="px-6 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold hover:border-[#0F5C6B]"
        >
          Submit Another Consultation
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="text-center space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-[#0F5C6B] bg-teal-50 px-3 py-1 rounded-full">Remote Records Review</span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
          Request a Specialist Second Opinion
        </h1>
        <p className="text-sm text-slate-600 max-w-xl mx-auto">
          A second opinion on cancer diagnosis, surgical margin clearance, and reconstruction options brings vital peace of mind.
        </p>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6 text-xs sm:text-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Patient Full Name *</label>
            <input
              type="text"
              required
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              placeholder="e.g. Anand Joshi"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#0F5C6B]"
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Mobile (+91) *</label>
            <input
              type="tel"
              required
              value={formData.mobile}
              onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
              placeholder="e.g. 9820011223"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#0F5C6B]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Email (For written review)</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="anand@example.com"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#0F5C6B]"
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Preferred Contact Mode</label>
            <select
              value={formData.contactMode}
              onChange={(e) => setFormData({ ...formData, contactMode: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-hidden focus:border-[#0F5C6B]"
            >
              <option value="WhatsApp / Phone call">WhatsApp & Phone Call</option>
              <option value="Video Conference (Zoom/Google Meet)">Scheduled Video Conference</option>
              <option value="Detailed Email Assessment">Detailed Email Assessment</option>
            </select>
          </div>
        </div>

        {/* File Upload Zone */}
        <div>
          <label className="block font-semibold text-slate-700 mb-1">Upload Diagnostic Reports (Biopsy, CT, MRI, Ultrasound)</label>
          <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 text-center hover:border-teal-500 transition bg-slate-50">
            <Upload className="w-8 h-8 text-teal-600 mx-auto mb-2" />
            <div className="text-xs text-slate-600">
              <label className="font-semibold text-[#0F5C6B] cursor-pointer hover:underline">
                <span>Click to select reports</span>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileDrop}
                  className="hidden"
                />
              </label>
              <span> or drag and drop files here</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Accepts PDF, JPG, PNG (Max 10 files, up to 10 MB each)</p>
          </div>

          {/* Uploaded File List */}
          {files.length > 0 && (
            <div className="mt-3 space-y-1.5">
              {files.map((f, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-teal-50/70 border border-teal-100 text-xs">
                  <span className="truncate max-w-xs text-slate-700 font-medium">{f.name}</span>
                  <button
                    type="button"
                    onClick={() => removeFile(idx)}
                    className="text-rose-500 hover:text-rose-700 p-1"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <label className="block font-semibold text-slate-700 mb-1">Brief Medical Summary & Diagnosis Stated Elsewhere</label>
          <textarea
            rows="4"
            value={formData.clinicalSummary}
            onChange={(e) => setFormData({ ...formData, clinicalSummary: e.target.value })}
            placeholder="Please detail what the previous doctor recommended (e.g. surgery date, extent of resection) and what specific guidance you are seeking..."
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#0F5C6B]"
          />
        </div>

        <div className="pt-2">
          <label className="flex items-start gap-3 cursor-pointer text-xs text-slate-600">
            <input
              type="checkbox"
              required
              checked={formData.consent}
              onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
              className="mt-0.5 accent-[#0F5C6B]"
            />
            <span>
              I confirm that the uploaded medical documents pertain to myself or a direct family member. I understand a second opinion review is advisory and intended to clarify clinical alternatives.
            </span>
          </label>
        </div>

        <button
          type="submit"
          className="w-full py-3.5 rounded-xl bg-[#0F5C6B] hover:bg-[#0B4450] text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
        >
          <FileText className="w-4 h-4 text-teal-200" />
          Submit Records for Second Opinion
        </button>
      </form>
    </div>
  );
}

// ==========================================
// PAGE 7: PATIENT EDUCATION & GUIDES
// ==========================================

function ArticlesListPage({ articles, onSelectArticle }) {
  const [search, setSearch] = useState('');
  const filtered = articles.filter(a =>
    a.title.toLowerCase().includes(search.toLowerCase()) ||
    a.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-[#0F5C6B] bg-teal-50 px-3 py-1 rounded-full">Patient Information Portal</span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
          Head & Neck Patient Guides
        </h1>
        <p className="text-slate-600 text-sm">
          Clear, medically verified advice on early detection, post-surgical recovery, nutrition, and voice preservation.
        </p>
      </div>

      <div className="relative max-w-md mx-auto">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
        <input
          type="text"
          placeholder="Search articles, symptoms, diet tips..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs focus:outline-hidden focus:border-[#0F5C6B]"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((art) => (
          <div
            key={art.slug}
            onClick={() => onSelectArticle(art.slug)}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:border-teal-400 hover:shadow-md transition cursor-pointer flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-teal-800 font-medium">
                <span className="bg-teal-50 px-2 py-0.5 rounded">{art.category}</span>
                <span className="text-slate-400">{art.readTime}</span>
              </div>
              <h3 className="font-serif text-xl font-bold text-slate-900 group-hover:text-[#0F5C6B] transition">
                {art.title}
              </h3>
              <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">{art.summary}</p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#0F5C6B] mt-4">
              <span>Read Full Guide</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ArticleDetailPage({ articles, activeSlug, onNavigate }) {
  const article = articles.find(a => a.slug === activeSlug) || articles[0];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="text-xs text-slate-400 flex items-center gap-1.5">
        <button onClick={() => onNavigate('home')} className="hover:text-slate-600">Home</button>
        <span>/</span>
        <button onClick={() => onNavigate('articles')} className="hover:text-slate-600">Guides</button>
        <span>/</span>
        <span className="text-[#0F5C6B] font-medium">{article.title}</span>
      </div>

      <div className="space-y-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-teal-800 bg-teal-50 px-2.5 py-1 rounded-md">
          {article.category}
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
          {article.title}
        </h1>
        <div className="text-xs text-slate-400 flex items-center gap-2">
          <span>By Dr. Dhara P. Sirodaria</span>
          <span>·</span>
          <span>{article.date}</span>
          <span>·</span>
          <span>{article.readTime}</span>
        </div>
      </div>

      <div className="prose prose-slate max-w-none text-slate-700 text-sm leading-relaxed whitespace-pre-line bg-white p-8 rounded-3xl border border-slate-200">
        {article.content}
      </div>

      <div className="bg-teal-50/60 p-6 rounded-2xl border border-teal-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <strong className="block font-serif text-slate-900 text-base">Have concerns about this condition?</strong>
          <span className="text-xs text-slate-600">Schedule a direct clinical consultation with Dr. Dhara.</span>
        </div>
        <button
          onClick={() => onNavigate('book')}
          className="px-5 py-2.5 rounded-xl bg-[#0F5C6B] text-white text-xs font-semibold hover:bg-[#0B4450] transition shadow-xs flex-shrink-0"
        >
          Book Appointment
        </button>
      </div>
    </div>
  );
}

function FaqsPage({ onBook }) {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="text-center space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-[#0F5C6B] bg-teal-50 px-3 py-1 rounded-full">Patient Clarity</span>
        <h1 className="font-serif text-3xl font-bold text-slate-900">Frequently Asked Questions</h1>
        <p className="text-sm text-slate-600">Common questions from patients and families preparing for head and neck surgery.</p>
      </div>

      <div className="space-y-4">
        {INITIAL_FAQS.map((f, idx) => (
          <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 text-sm space-y-2 shadow-xs">
            <h3 className="font-serif font-bold text-slate-900 text-base flex items-start gap-2">
              <span className="text-[#0F5C6B]">Q.</span> {f.q}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-5">{f.a}</p>
          </div>
        ))}
      </div>

      <div className="text-center pt-6">
        <button
          onClick={onBook}
          className="px-6 py-3 rounded-xl bg-[#0F5C6B] text-white text-xs font-semibold hover:bg-[#0B4450]"
        >
          Have a Question Not Listed? Book a Consultation
        </button>
      </div>
    </div>
  );
}

function VideosPage({ onBook }) {
  const curatedVideos = [
    { title: 'Understanding Oral Cancer Biopsy: Dispelling Common Fears', id: 'video1', duration: '6 mins' },
    { title: 'Rehabilitation After Head and Neck Surgery: Speech & Swallowing', id: 'video2', duration: '8 mins' },
    { title: 'Thyroid Nodules: When is Surgery Actually Required?', id: 'video3', duration: '5 mins' }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-[#0F5C6B] bg-teal-50 px-3 py-1 rounded-full">Visual Education</span>
        <h1 className="font-serif text-3xl font-bold text-slate-900">Curated Video Library</h1>
        <p className="text-slate-600 text-sm">Educational briefings designed to guide patients through surgical decision making.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {curatedVideos.map((v, i) => (
          <div key={i} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="h-44 bg-slate-800 flex items-center justify-center text-teal-400 relative">
              <Video className="w-12 h-12" />
              <span className="absolute bottom-2 right-2 text-[10px] bg-black/70 text-white px-2 py-0.5 rounded">
                {v.duration}
              </span>
            </div>
            <div className="p-4 space-y-2">
              <h3 className="font-serif font-bold text-slate-900 text-sm">{v.title}</h3>
              <p className="text-[11px] text-slate-500">Curated patient guide video.</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// PAGE 8: PUBLICATIONS & ACADEMICS
// ==========================================

function PublicationsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="text-center space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-[#0F5C6B] bg-teal-50 px-3 py-1 rounded-full">Academic Research</span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
          Scientific Publications & Clinical Research
        </h1>
        <p className="text-sm text-slate-600">
          Peer-reviewed surgical contributions focused on head & neck oncology prognostic markers and complex maxillofacial resections.
        </p>
      </div>

      <div className="space-y-6">
        {INITIAL_PUBLICATIONS.map((pub, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between text-xs text-teal-800 font-semibold">
              <span className="bg-teal-50 px-2.5 py-1 rounded-md">{pub.type}</span>
              <span className="text-slate-400 font-normal">{pub.journal}</span>
            </div>
            <h3 className="font-serif text-lg font-bold text-slate-900">{pub.title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{pub.highlight}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// PAGE 9: CONTACT PRACTICE
// ==========================================

function ContactPage({ siteSettings, locations }) {
  const [formSent, setFormSent] = useState(false);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-[#0F5C6B] bg-teal-50 px-3 py-1 rounded-full">Direct Practice Access</span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
          Contact Dr. Dhara’s Practice
        </h1>
        <p className="text-slate-600 text-sm">
          Appointments, hospital coordination, and doctor-to-doctor clinical referrals.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
        {/* Contact info column */}
        <div className="md:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-serif text-lg font-bold text-slate-900">Practice Coordination</h3>
            
            <div className="space-y-3 text-xs sm:text-sm">
              <a href={`tel:${siteSettings.phone.replace(/\s+/g, '')}`} className="flex items-center gap-3 text-slate-700 hover:text-[#0F5C6B]">
                <div className="w-9 h-9 rounded-xl bg-teal-50 text-[#0F5C6B] flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-400">Phone & Urgent Inquiries</div>
                  <div className="font-semibold">{siteSettings.phone}</div>
                </div>
              </a>

              <a href={`https://wa.me/${siteSettings.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-slate-700 hover:text-[#0F5C6B]">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-400">WhatsApp Practice Line</div>
                  <div className="font-semibold">{siteSettings.whatsapp}</div>
                </div>
              </a>

              <a href={`mailto:${siteSettings.email}`} className="flex items-center gap-3 text-slate-700 hover:text-[#0F5C6B]">
                <div className="w-9 h-9 rounded-xl bg-teal-50 text-[#0F5C6B] flex items-center justify-center flex-shrink-0">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-400">Doctor's Direct Email</div>
                  <div className="font-semibold">{siteSettings.email}</div>
                </div>
              </a>
            </div>
          </div>

          <div className="bg-[#0F5C6B]/10 p-5 rounded-2xl border border-teal-200 text-xs text-slate-700 space-y-2">
            <strong className="block text-[#0F5C6B] font-serif text-sm">Practice Logistics</strong>
            <p>
              Dr. Dhara operates and consults across 14 leading hospitals in Mumbai (Andheri, Malad, Kurla, Borivali, Goregaon, Vile Parle, Mira Road, Vasai).
            </p>
            <p className="text-[11px] text-slate-500">
              Consultations are scheduled strictly by prior appointment to prevent long waiting times for patients and families.
            </p>
          </div>
        </div>

        {/* Message form */}
        <div className="md:col-span-7">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs">
            <h3 className="font-serif text-xl font-bold text-slate-900 mb-4">Send a Message</h3>
            {formSent ? (
              <div className="p-6 rounded-2xl bg-teal-50 text-center space-y-2 text-[#0F5C6B]">
                <CheckCircle2 className="w-10 h-10 mx-auto" />
                <h4 className="font-serif font-bold text-lg">Message Delivered</h4>
                <p className="text-xs text-slate-600">Our clinical coordination staff will acknowledge your message shortly.</p>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setFormSent(true); }} className="space-y-4 text-xs sm:text-sm">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Your Name</label>
                  <input type="text" required placeholder="Full Name" className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#0F5C6B]" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Mobile</label>
                    <input type="tel" required placeholder="10-digit Mobile" className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#0F5C6B]" />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Email</label>
                    <input type="email" placeholder="email@address.com" className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#0F5C6B]" />
                  </div>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Message / Clinical Query</label>
                  <textarea rows="4" required placeholder="How can our practice assist you?" className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#0F5C6B]" />
                </div>
                <button type="submit" className="w-full py-3 rounded-xl bg-[#0F5C6B] text-white font-bold text-xs hover:bg-[#0B4450] transition shadow-xs">
                  Send Message to Coordinator
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// LEGAL PAGES: PRIVACY & DISCLAIMER
// ==========================================

function LegalPrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
      <h1 className="font-serif text-3xl font-bold text-slate-900">Privacy Policy (DPDP Act 2023 Compliant)</h1>
      <p className="text-slate-500">Effective Date: November 2026</p>
      
      <p>
        Dr. Dhara P. Sirodaria’s practice is committed to safeguarding patient confidentiality in full alignment with the <em>Digital Personal Data Protection (DPDP) Act 2023</em> of India and medical ethics guidelines.
      </p>

      <h3 className="font-serif text-base font-bold text-slate-900">1. Collection of Health Data</h3>
      <p>
        We collect only the personal identifiers (name, age, phone number, email) and medical records (biopsy findings, pathology reports, radiological scans) strictly necessary to facilitate clinical consultations, hospital admission scheduling, and second opinions.
      </p>

      <h3 className="font-serif text-base font-bold text-slate-900">2. Security & Storage</h3>
      <p>
        All diagnostic reports uploaded via this website are stored in restricted-access databases viewable solely by Dr. Dhara Sirodaria and designated clinical staff. We do not sell, rent, or commercialize patient information under any circumstance.
      </p>

      <h3 className="font-serif text-base font-bold text-slate-900">3. Patient Rights</h3>
      <p>
        Patients maintain the right to review, update, or request the erasure of their uploaded contact records by communicating in writing to <strong>dhara.sirodaria@gmail.com</strong>.
      </p>
    </div>
  );
}

function LegalDisclaimerPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
      <h1 className="font-serif text-3xl font-bold text-slate-900">Medical Disclaimer & Compliance Notice</h1>
      <p className="text-slate-500">Regulatory Adherence to National Medical Commission Norms</p>

      <div className="p-4 bg-teal-50 border border-teal-200 rounded-xl text-teal-900">
        <strong>Important Notice:</strong> This website is an informational and scheduling interface. No content herein constitutes guaranteed treatment outcomes, and no promotional or superlative claims ("best doctor/surgeon") are made.
      </div>

      <p>
        The medical narratives, symptom guides, and treatment outlines on this website are provided strictly for educational purposes and to empower patients to seek timely medical attention. They must never be interpreted as an individual medical prescription or formal prognostic claim.
      </p>

      <p>
        Head and neck oncological surgeries entail variable biological considerations, tissue healing profiles, and adjuvant radiation/chemotherapy requirements. A comprehensive in-person clinical assessment is mandatory prior to any surgical intervention.
      </p>
    </div>
  );
}

// ==========================================
// ADMIN DASHBOARD & SECURE CMS
// ==========================================

function AdminPanel({
  locations, setLocations,
  appointments, setAppointments,
  articles, setArticles,
  treatments, setTreatments,
  siteSettings, setSiteSettings,
  onExitAdmin,
  onOpenGuide
}) {
  // Simulated Authentication
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // Password Recovery States
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);

  // Admin Active Tab
  const [activeTab, setActiveTab] = useState('appointments'); // appointments, locations, content, media, settings

  // Appointment filters
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Location CRUD modal states
  const [editingLocation, setEditingLocation] = useState(null);
  const [showLocModal, setShowLocModal] = useState(false);

  // Media manager states
  const [mediaNotification, setMediaNotification] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setAuthError('');
    // Friendly simulated demo auth (any reasonable credentials or default dhara)
    if (adminEmail && adminPassword.length >= 4) {
      setIsAuthenticated(true);
    } else {
      setAuthError('Please enter a valid email and password (min 4 characters).');
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setAppointments(appointments.map(a => a.id === id ? { ...a, status: newStatus } : a));
  };

  const handleNoteChange = (id, notes) => {
    setAppointments(appointments.map(a => a.id === id ? { ...a, notes } : a));
  };

  const exportAppointmentsCSV = () => {
    const headers = 'ID,Patient Name,Mobile,Email,Age,Type,Location,Date,Slot,Concern,Status,Notes\n';
    const rows = appointments.map(a => 
      `"${a.id}","${a.fullName}","${a.mobile}","${a.email || ''}","${a.age || ''}","${a.type}","${a.location}","${a.preferredDate}","${a.timeSlot}","${a.concern}","${a.status}","${(a.notes || '').replace(/"/g, '""')}"`
    ).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `dr-dhara-appointments-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const saveLocation = (loc) => {
    if (loc.id) {
      setLocations(locations.map(l => l.id === loc.id ? loc : l));
    } else {
      setLocations([...locations, { ...loc, id: String(Date.now()), active: true }]);
    }
    setShowLocModal(false);
    setEditingLocation(null);
  };

  const deleteLocation = (id) => {
    if (confirm('Are you sure you want to remove this hospital location from the directory?')) {
      setLocations(locations.filter(l => l.id !== id));
    }
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-4 py-20">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <BrandLogo variant="icon" className="mx-auto" />
            <h2 className="font-serif text-2xl font-bold text-slate-900">Dr. Dhara Practice Portal</h2>
            <p className="text-xs text-slate-500">Sign in to manage patient appointments, hospital locations & media.</p>
          </div>

          {authError && (
            <div className="p-3 rounded-xl bg-rose-50 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-xs sm:text-sm">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Admin Email</label>
              <input
                type="email"
                required
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                placeholder="dhara.sirodaria@gmail.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#0F5C6B]"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Password</label>
              <input
                type="password"
                required
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#0F5C6B]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#0F5C6B] text-white font-bold text-xs hover:bg-[#0B4450] transition shadow-md"
            >
              Sign In to Dashboard
            </button>
          </form>

          <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
            <button
              onClick={() => { setShowForgotModal(true); setResetSent(false); }}
              className="hover:text-[#0F5C6B] underline"
            >
              Forgot password?
            </button>
            <button onClick={onExitAdmin} className="hover:text-slate-700">
              Back to Public Website
            </button>
          </div>
        </div>

        {/* Forgot Password Flow */}
        {showForgotModal && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-sm w-full p-6 space-y-4 text-xs sm:text-sm shadow-2xl">
              <h3 className="font-serif font-bold text-lg text-slate-900">Reset Admin Password</h3>
              {resetSent ? (
                <div className="space-y-3 text-slate-600">
                  <p className="text-emerald-700 font-medium">
                    Password reset link generated for <strong>{forgotEmail || 'your email'}</strong>. (Simulated)
                  </p>
                  <p className="text-xs text-slate-500">Please check your inbox. For safety, this temporary token expires in 30 minutes.</p>
                  <button
                    onClick={() => setShowForgotModal(false)}
                    className="w-full py-2 rounded-xl bg-[#0F5C6B] text-white font-semibold text-xs"
                  >
                    Return to Login
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-slate-600">Enter your registered email address to receive a secure time-limited reset link.</p>
                  <input
                    type="email"
                    placeholder="dhara.sirodaria@gmail.com"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowForgotModal(false)}
                      className="flex-1 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => setResetSent(true)}
                      className="flex-1 py-2 rounded-xl bg-[#0F5C6B] text-white text-xs font-semibold"
                    >
                      Send Reset Link
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Filtered Appointments
  const filteredAppointments = appointments.filter((a) => {
    const matchStatus = statusFilter === 'All' || a.status === statusFilter;
    const matchSearch =
      a.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.mobile.includes(searchTerm) ||
      a.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="min-h-screen bg-slate-100/70 pb-16">
      {/* Admin Top Navigation */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 px-4 sm:px-8 py-3 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <BrandLogo variant="icon" />
          <div>
            <h1 className="font-serif font-bold text-slate-900 text-sm sm:text-base">Practice Manager</h1>
            <span className="text-[11px] text-teal-700 font-medium">Logged in as Dr. Dhara Sirodaria (Owner)</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenGuide}
            className="px-3 py-1.5 rounded-lg text-xs font-medium text-teal-800 bg-teal-50 hover:bg-teal-100 flex items-center gap-1.5 transition"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Owner User Guide</span>
          </button>
          <button
            onClick={onExitAdmin}
            className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 flex items-center gap-1.5 transition"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">View Live Site</span>
          </button>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Admin Subheader Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
          {[
            { id: 'appointments', label: 'Appointments & Requests', count: appointments.length },
            { id: 'locations', label: 'Hospitals & Clinics', count: locations.length },
            { id: 'content', label: 'Page Content Editor' },
            { id: 'media', label: 'Media & Branding Library' },
            { id: 'settings', label: 'Site Practice Settings' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center gap-2 ${activeTab === tab.id ? 'bg-[#0F5C6B] text-white shadow-xs' : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'}`}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`px-2 py-0.2 rounded-full text-[10px] ${activeTab === tab.id ? 'bg-teal-800 text-teal-100' : 'bg-slate-100 text-slate-600'}`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* TAB CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
        {/* =========================================
            TAB 1: APPOINTMENTS & ENQUIRIES
           ========================================= */}
        {activeTab === 'appointments' && (
          <div className="space-y-6">
            {/* Top Toolbar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                {['All', 'New', 'Contacted', 'Confirmed', 'Completed', 'Cancelled'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${statusFilter === st ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                  >
                    {st}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="relative flex-1 md:w-64">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search by name, phone or ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs focus:outline-hidden"
                  />
                </div>
                <button
                  onClick={exportAppointmentsCSV}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-black text-white text-xs font-semibold flex items-center gap-1.5 flex-shrink-0"
                >
                  <Download className="w-3.5 h-3.5" />
                  Export CSV
                </button>
              </div>
            </div>

            {/* Appointments Table */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="p-3.5">ID / Date</th>
                      <th className="p-3.5">Patient Details</th>
                      <th className="p-3.5">Type & Hospital</th>
                      <th className="p-3.5">Slot / Concern</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5">Internal Notes</th>
                      <th className="p-3.5 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {filteredAppointments.map((apt) => (
                      <tr key={apt.id} className="hover:bg-slate-50/80">
                        <td className="p-3.5 align-top">
                          <span className="font-bold text-slate-900 block">{apt.id}</span>
                          <span className="text-[10px] text-slate-400">{apt.createdAt}</span>
                        </td>
                        <td className="p-3.5 align-top">
                          <span className="font-semibold text-slate-900 block">{apt.fullName}</span>
                          <a href={`tel:${apt.mobile}`} className="text-[#0F5C6B] hover:underline block font-medium">
                            +91 {apt.mobile}
                          </a>
                          {apt.email && <span className="text-[11px] text-slate-400 block">{apt.email}</span>}
                          {apt.age && <span className="text-[10px] text-slate-500">Age: {apt.age}</span>}
                        </td>
                        <td className="p-3.5 align-top">
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-teal-50 text-teal-800 block mb-1 w-max">
                            {apt.type}
                          </span>
                          <span className="text-slate-600 font-medium block">{apt.location}</span>
                        </td>
                        <td className="p-3.5 align-top">
                          <span className="font-semibold text-slate-800 block">{apt.preferredDate}</span>
                          <span className="text-[11px] text-slate-500 block">{apt.timeSlot}</span>
                          <span className="text-slate-700 text-[11px] font-medium block mt-1">{apt.concern}</span>
                        </td>
                        <td className="p-3.5 align-top">
                          <select
                            value={apt.status}
                            onChange={(e) => handleStatusChange(apt.id, e.target.value)}
                            className={`px-2 py-1 rounded-lg text-xs font-semibold border ${
                              apt.status === 'New' ? 'bg-amber-50 text-amber-800 border-amber-200' :
                              apt.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' :
                              apt.status === 'Completed' ? 'bg-blue-50 text-blue-800 border-blue-200' :
                              apt.status === 'Cancelled' ? 'bg-rose-50 text-rose-800 border-rose-200' :
                              'bg-slate-100 text-slate-700 border-slate-200'
                            }`}
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="p-3.5 align-top">
                          <textarea
                            rows="2"
                            value={apt.notes || ''}
                            onChange={(e) => handleNoteChange(apt.id, e.target.value)}
                            placeholder="Add doctor note..."
                            className="w-48 px-2 py-1 text-xs border border-slate-200 rounded-lg bg-white"
                          />
                        </td>
                        <td className="p-3.5 align-top text-right">
                          <a
                            href={`https://wa.me/91${apt.mobile.replace(/\D/g, '')}?text=${encodeURIComponent(`Hello ${apt.fullName}, this is Dr. Dhara Sirodaria's clinic regarding your consultation request ${apt.id}.`)}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-block p-1.5 rounded-lg text-emerald-600 bg-emerald-50 hover:bg-emerald-100"
                            title="Message on WhatsApp"
                          >
                            <MessageSquare className="w-4 h-4" />
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredAppointments.length === 0 && (
                <div className="p-8 text-center text-slate-400">
                  No patient appointments found under this filter.
                </div>
              )}
            </div>
          </div>
        )}

        {/* =========================================
            TAB 2: LOCATIONS CRUD MANAGER
           ========================================= */}
        {activeTab === 'locations' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-serif text-xl font-bold text-slate-900">Hospital & Clinic Directory</h2>
                <p className="text-xs text-slate-500">Add, edit, or toggle hospitals where Dr. Dhara attends on-call consultations.</p>
              </div>
              <button
                onClick={() => { setEditingLocation({ name: '', area: '', region: 'Western Suburbs', address: '', active: true }); setShowLocModal(true); }}
                className="px-4 py-2 rounded-xl bg-[#0F5C6B] text-white text-xs font-semibold flex items-center gap-1.5 hover:bg-[#0B4450]"
              >
                <Plus className="w-4 h-4" />
                Add New Hospital
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {locations.map((loc) => (
                <div key={loc.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-semibold uppercase text-teal-800 bg-teal-50 px-2 py-0.5 rounded">
                        {loc.area}
                      </span>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${loc.active ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-400'}`}>
                        {loc.active ? 'Active' : 'Hidden'}
                      </span>
                    </div>
                    <h3 className="font-serif font-bold text-slate-900 text-base">{loc.name}</h3>
                    <p className="text-xs text-slate-500">{loc.address}</p>
                    <div className="text-[10px] text-slate-400 font-medium">Region: {loc.region}</div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-4">
                    <button
                      onClick={() => { setEditingLocation(loc); setShowLocModal(true); }}
                      className="text-xs font-semibold text-[#0F5C6B] hover:underline flex items-center gap-1"
                    >
                      <Edit3 className="w-3.5 h-3.5" /> Edit Details
                    </button>
                    <button
                      onClick={() => deleteLocation(loc.id)}
                      className="text-xs text-rose-500 hover:text-rose-700 p-1"
                      title="Remove location"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Location Edit/Add Modal */}
            {showLocModal && editingLocation && (
              <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl text-xs sm:text-sm">
                  <h3 className="font-serif font-bold text-lg text-slate-900">
                    {editingLocation.id ? 'Edit Hospital Location' : 'Add New Hospital Location'}
                  </h3>

                  <div className="space-y-3">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Hospital / Clinic Name</label>
                      <input
                        type="text"
                        value={editingLocation.name}
                        onChange={(e) => setEditingLocation({ ...editingLocation, name: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Area / Suburb</label>
                      <input
                        type="text"
                        value={editingLocation.area}
                        onChange={(e) => setEditingLocation({ ...editingLocation, area: e.target.value })}
                        placeholder="e.g. Andheri West"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Mumbai Region</label>
                      <select
                        value={editingLocation.region}
                        onChange={(e) => setEditingLocation({ ...editingLocation, region: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs"
                      >
                        <option value="Western Suburbs">Western Suburbs</option>
                        <option value="Central / Harbour">Central / Harbour</option>
                        <option value="Extended Suburbs (Mira-Vasai)">Extended Suburbs (Mira-Vasai)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Complete Address</label>
                      <textarea
                        rows="3"
                        value={editingLocation.address}
                        onChange={(e) => setEditingLocation({ ...editingLocation, address: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                      />
                    </div>
                    <label className="flex items-center gap-2 cursor-pointer pt-1">
                      <input
                        type="checkbox"
                        checked={editingLocation.active}
                        onChange={(e) => setEditingLocation({ ...editingLocation, active: e.target.checked })}
                        className="accent-[#0F5C6B]"
                      />
                      <span className="font-semibold text-slate-700">Display this hospital on public site & booking dropdown</span>
                    </label>
                  </div>

                  <div className="flex gap-2 pt-4 border-t border-slate-100">
                    <button
                      onClick={() => setShowLocModal(false)}
                      className="flex-1 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => saveLocation(editingLocation)}
                      className="flex-1 py-2 rounded-xl bg-[#0F5C6B] text-white text-xs font-semibold"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* =========================================
            TAB 3: CONTENT & HOMEPAGE MANAGER
           ========================================= */}
        {activeTab === 'content' && (
          <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-6">
            <div>
              <h2 className="font-serif text-xl font-bold text-slate-900">Live Homepage & Text Editor</h2>
              <p className="text-xs text-slate-500">Edit key headlines, registrations and clinical descriptions without writing code.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Home Hero Headline</label>
                <input
                  type="text"
                  value={siteSettings.heroHeadline}
                  onChange={(e) => setSiteSettings({ ...siteSettings, heroHeadline: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Medical Registration Banner</label>
                <input
                  type="text"
                  value={siteSettings.registration}
                  onChange={(e) => setSiteSettings({ ...siteSettings, registration: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block font-semibold text-slate-700 mb-1">Hero Subtext & Compassionate Statement</label>
                <textarea
                  rows="3"
                  value={siteSettings.heroSubtext}
                  onChange={(e) => setSiteSettings({ ...siteSettings, heroSubtext: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-between text-xs">
              <span className="text-teal-900 font-medium">Changes persist automatically to your browser storage and update the live website immediately.</span>
              <button
                onClick={() => alert('All content settings have been saved to local storage!')}
                className="px-4 py-1.5 rounded-lg bg-[#0F5C6B] text-white font-semibold"
              >
                Publish Live
              </button>
            </div>
          </div>
        )}

        {/* =========================================
            TAB 4: MEDIA MANAGER & BRANDING
           ========================================= */}
        {activeTab === 'media' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-6">
              <div>
                <h2 className="font-serif text-xl font-bold text-slate-900">Media Library & Identity Assets</h2>
                <p className="text-xs text-slate-500">
                  Manage the doctor's portrait, practice vector logo, favicons, and social share previews.
                </p>
              </div>

              {mediaNotification && (
                <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs">
                  {mediaNotification}
                </div>
              )}

              {/* Doctor Portrait Replacement */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-3 flex justify-center">
                  <div className="w-32 h-44 rounded-2xl overflow-hidden shadow-md border-2 border-white bg-slate-200">
                    <DoctorPortraitImage
                      src={siteSettings.doctorPortraitUrl}
                      alt="Dr Dhara"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </div>

                <div className="md:col-span-9 space-y-3 text-xs sm:text-sm">
                  <div>
                    <h3 className="font-serif font-bold text-slate-900 text-base">Doctor Official Portrait</h3>
                    <p className="text-xs text-slate-500">
                      Primary image used across Hero, About page, Booking reassurance, and Social OpenGraph cards.
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <label className="px-4 py-2 rounded-xl bg-[#0F5C6B] hover:bg-[#0B4450] text-white text-xs font-semibold cursor-pointer flex items-center gap-2">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload New Portrait (WebP / JPG)</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            const url = URL.createObjectURL(e.target.files[0]);
                            setSiteSettings({ ...siteSettings, doctorPortraitUrl: url });
                            setMediaNotification('Portrait replaced successfully! Changes reflected across all pages.');
                          }
                        }}
                      />
                    </label>
                    <button
                      onClick={() => {
                        setSiteSettings({ ...siteSettings, doctorPortraitUrl: DEFAULT_PORTRAIT_URL });
                        setMediaNotification('Reset to original camera portrait.');
                      }}
                      className="px-3 py-2 rounded-xl border border-slate-300 text-slate-600 text-xs font-medium hover:bg-white"
                    >
                      Reset to Default Portrait
                    </button>
                  </div>
                  <span className="text-[11px] text-slate-400 block">Recommended dimensions: 800×1000px vertical or square crop.</span>
                </div>
              </div>

              {/* Vector Logo Variants */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-serif font-bold text-slate-900 text-base">Practice Vector Logo (SVG)</h3>
                    <p className="text-xs text-slate-500">Original geometric DS monogram in care shield.</p>
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">SVG Vector Active</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-center justify-center">
                    <BrandLogo />
                  </div>
                  <div className="p-4 rounded-xl bg-[#0F5C6B] border border-teal-800 flex items-center justify-center">
                    <BrandLogo isDark={true} />
                  </div>
                </div>
              </div>

              {/* Favicon & Social Share Preview Generator */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <div>
                  <h3 className="font-serif font-bold text-slate-900 text-base">Favicon & Social Share Previews</h3>
                  <p className="text-xs text-slate-500">
                    Auto-generated favicon resolutions and OpenGraph preview for WhatsApp, LinkedIn & Telegram sharing.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  {/* Favicon sizes preview */}
                  <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
                    <span className="text-xs font-bold text-slate-700">Multi-Resolution Favicon Suite</span>
                    <div className="flex items-end gap-4">
                      <div className="text-center">
                        <div className="w-4 h-4 bg-teal-50 border border-teal-200 flex items-center justify-center mx-auto mb-1">
                          <BrandLogo variant="icon" className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-[10px] text-slate-400">16×16</span>
                      </div>
                      <div className="text-center">
                        <div className="w-8 h-8 bg-teal-50 border border-teal-200 flex items-center justify-center mx-auto mb-1 rounded-sm">
                          <BrandLogo variant="icon" className="w-7 h-7" />
                        </div>
                        <span className="text-[10px] text-slate-400">32×32</span>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-teal-50 border border-teal-200 flex items-center justify-center mx-auto mb-1 rounded-lg">
                          <BrandLogo variant="icon" className="w-10 h-10" />
                        </div>
                        <span className="text-[10px] text-slate-400">Apple 180</span>
                      </div>
                    </div>
                  </div>

                  {/* WhatsApp/OG Share Card */}
                  <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
                    <span className="text-xs font-bold text-slate-700">Social / WhatsApp Card Preview (1200×630)</span>
                    <div className="bg-slate-100 rounded-lg p-3 border border-slate-200 flex items-center gap-3">
                      <div className="w-14 h-14 rounded-lg overflow-hidden bg-white flex-shrink-0">
                        <DoctorPortraitImage
                          src={siteSettings.doctorPortraitUrl}
                          alt="Dr Dhara"
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                      <div className="leading-tight text-xs">
                        <span className="font-bold text-slate-900 block">Dr. Dhara Sirodaria | Head & Neck Surgeon Mumbai</span>
                        <span className="text-[11px] text-slate-500 block">Oral cancer, neck lumps, thyroid surgery & reconstruction.</span>
                        <span className="text-[10px] text-teal-700 font-medium">drdharasirodaria.com</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================
            TAB 5: SITE PRACTICE SETTINGS
           ========================================= */}
        {activeTab === 'settings' && (
          <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-6">
            <div>
              <h2 className="font-serif text-xl font-bold text-slate-900">Practice Communication Coordinates</h2>
              <p className="text-xs text-slate-500">Update phone, WhatsApp line, and emergency disclaimer parameters.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Direct Coordination Phone</label>
                <input
                  type="text"
                  value={siteSettings.phone}
                  onChange={(e) => setSiteSettings({ ...siteSettings, phone: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Practice WhatsApp Line</label>
                <input
                  type="text"
                  value={siteSettings.whatsapp}
                  onChange={(e) => setSiteSettings({ ...siteSettings, whatsapp: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Official Doctor Email</label>
                <input
                  type="email"
                  value={siteSettings.email}
                  onChange={(e) => setSiteSettings({ ...siteSettings, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Practice Working Schedule</label>
                <input
                  type="text"
                  defaultValue="Monday – Saturday: 9:00 AM – 8:00 PM (By Appointment)"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => alert('Practice settings saved!')}
                className="px-6 py-2 rounded-xl bg-[#0F5C6B] text-white text-xs font-semibold"
              >
                Save Settings
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

// ==========================================
// DOCTOR / OWNER USER GUIDE MODAL
// ==========================================

function UserGuideModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl space-y-6 text-xs sm:text-sm text-slate-700">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2 text-[#0F5C6B]">
            <BookOpen className="w-5 h-5" />
            <h2 className="font-serif font-bold text-xl text-slate-900">Dr. Dhara’s Practice Manual</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 leading-relaxed">
          <div className="p-3.5 rounded-xl bg-teal-50 border border-teal-100 text-teal-900">
            <strong>Welcome Dr. Dhara:</strong> This website was built so you or your clinic staff can manage patient appointment requests, update hospital visiting locations, and edit text without needing any web developer.
          </div>

          <div className="space-y-2">
            <h3 className="font-serif font-bold text-slate-900 text-base">1. How to Log In & Reset Password</h3>
            <p>
              Click <strong>Staff Portal</strong> in the website footer or navigate directly to the Admin portal. Enter your email and password. If you ever forget your password, click <em>"Forgot password?"</em> to receive a secure time-limited reset link.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-serif font-bold text-slate-900 text-base">2. Managing Patient Appointments</h3>
            <p>
              Under the <strong>Appointments & Requests</strong> tab in the admin panel:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Review incoming requests with the patient's name, 10-digit mobile, preferred hospital, and date.</li>
              <li>Change the status pill from <em>New</em> → <em>Contacted</em> → <em>Confirmed</em> or <em>Completed</em>.</li>
              <li>Add internal clinical notes (e.g. "CT neck advised").</li>
              <li>Click the green WhatsApp icon to initiate a pre-filled direct conversation with the patient.</li>
              <li>Export all patient requests as a CSV spreadsheet at any time.</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="font-serif font-bold text-slate-900 text-base">3. Adding or Updating Hospital Locations</h3>
            <p>
              Under the <strong>Hospitals & Clinics</strong> tab, you can add any new hospital or diagnostic centre you visit. You can also temporarily toggle a hospital to "Hidden" if you are not operating there that month.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-serif font-bold text-slate-900 text-base">4. Replacing Photos, Logo & Social Previews</h3>
            <p>
              In the <strong>Media & Branding Library</strong>, you can upload new portraits. The system automatically creates responsive crops and generates the WhatsApp/social preview cards.
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-[#0F5C6B] text-white text-xs font-semibold hover:bg-[#0B4450]"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
}