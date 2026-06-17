import { useState } from "react";

// ── DATA ──────────────────────────────────────────────────────────────────────

const categories = [
  {
    id: "academic", label: "Academic Excellence", color: "#7C5C2E", accent: "#F5ECD7", icon: "◈",
    items: [
      {
        id: "a1", text: "Lift GPA from 3.843 to 3.93+ by graduation", priority: "critical",
        subtasks: [
          { id: "a1a", text: "Aim for A in every course junior year — no B+ tolerance in major courses" },
          { id: "a1b", text: "Drop any course trending below A- before withdrawal deadline" },
          { id: "a1c", text: "Use NYU tutoring center and office hours proactively, not reactively" },
          { id: "a1d", text: "Target GPA path: 3.93 by end of junior year, 3.95 by graduation" },
        ]
      },
      {
        id: "a2", text: "Complete core psychology coursework strategically", priority: "critical",
        subtasks: [
          { id: "a2a", text: "PSYCH-UA 25: Research Methods & Statistics (mandatory — take ASAP)" },
          { id: "a2b", text: "PSYCH-UA 44: Social Psychology (aligns with your interests)" },
          { id: "a2c", text: "PSYCH-UA 51: Developmental Psychology" },
          { id: "a2d", text: "PSYCH-UA 60: Abnormal Psychology" },
          { id: "a2e", text: "PSYCH-UA 10: Brain and Behavior (neuroscience foundation)" },
          { id: "a2f", text: "PSYCH-UA 29: Cognitive Psychology" },
        ]
      },
      {
        id: "a3", text: "Take graduate-level or advanced courses to demonstrate ceiling", priority: "high",
        subtasks: [
          { id: "a3a", text: "PSYCH-GA 2002: Advanced Social Psychology (grad course — ask to enroll)" },
          { id: "a3b", text: "ARTSTUD-UA or Art History cross-listed with Psychology — perception, aesthetics, visual cognition" },
          { id: "a3c", text: "Statistics or data analysis course: R, Python for Psych (shows quant skills)" },
        ]
      },
      {
        id: "a4", text: "Earn A's in all quantitative courses — committees scrutinize these", priority: "high",
        subtasks: [
          { id: "a4a", text: "Statistics for Psychology — must be A" },
          { id: "a4b", text: "Research Methods — must be A" },
          { id: "a4c", text: "Neuroscience/Brain courses — aim A" },
        ]
      },
      {
        id: "a5", text: "Enroll in NYU Honors Thesis Program (apply in junior spring)", priority: "high",
        subtasks: [
          { id: "a5a", text: "Identify thesis advisor from your lab by end of junior fall" },
          { id: "a5b", text: "Draft thesis topic proposal: how aesthetic engagement with visual art affects emotional regulation, OR art-making as mental health intervention" },
          { id: "a5c", text: "Apply to honors thesis program by February 2027 deadline" },
        ]
      },
      {
        id: "a6", text: "Build 3–4 deep faculty relationships for exceptional letters", priority: "critical",
        subtasks: [
          { id: "a6a", text: "At least 2 letters must be from research supervisors, not just instructors" },
          { id: "a6b", text: "Meet with each potential letter writer at least 3× before asking" },
          { id: "a6c", text: "Share your Rhodes/PhD ambitions with faculty early so they can speak to your potential" },
        ]
      },
    ],
  },
  {
    id: "research", label: "Research & Scholarship", color: "#1D5E72", accent: "#E0F2F7", icon: "◉",
    items: [
      {
        id: "r1", text: "Join an NYU psychology lab — email faculty this week", priority: "critical",
        subtasks: [
          { id: "r1a", text: "Email Prof. Emily Balcetis (Social Psych, motivation & visual perception) — strong fit" },
          { id: "r1b", text: "Email Prof. Gabriele Oettingen (Motivation, WOOP theory) — MCNYU Lab" },
          { id: "r1c", text: "Email Prof. Niall Bolger (Emotion regulation, daily life methods)" },
          { id: "r1d", text: "Email Prof. Catherine Hartley (Developmental neuroscience, adolescent risk)" },
          { id: "r1e", text: "Email Prof. Jay Van Bavel (Social identity, moral psychology) — very well known" },
          { id: "r1f", text: "Craft a 3-paragraph cold email: your background, their specific work, your ask" },
        ]
      },
      {
        id: "r2", text: "Target the visual art × psychology intersection in your research", priority: "high",
        subtasks: [
          { id: "r2a", text: "Focus area: empirical aesthetics — how people perceive and respond to visual art psychologically" },
          { id: "r2b", text: "Focus area: art therapy and expressive arts as mental health intervention" },
          { id: "r2c", text: "Focus area: visual perception, attention, and emotion — painting as stimulus in psych research" },
          { id: "r2d", text: "Read 10 papers in empirical aesthetics and art therapy before meeting faculty" },
          { id: "r2e", text: "Key journals: Psychology of Aesthetics, Creativity, and the Arts; Empirical Studies of the Arts" },
        ]
      },
      {
        id: "r3", text: "Present at undergraduate research symposia", priority: "high",
        subtasks: [
          { id: "r3a", text: "NYU Undergraduate Research Conference (spring each year) — submit abstract" },
          { id: "r3b", text: "Psi Chi virtual conferences accept undergrad submissions year-round" },
          { id: "r3c", text: "APS Student Research Award — apply in junior spring" },
        ]
      },
      {
        id: "r4", text: "Apply to summer research programs (REU / NIH)", priority: "critical",
        subtasks: [
          { id: "r4a", text: "NSF REU in Psychology — applications open Nov, due Jan/Feb 2027" },
          { id: "r4b", text: "NIH Summer Internship Program (SIP) — due March 1 each year" },
          { id: "r4c", text: "APA Summer Science Fellowship" },
          { id: "r4d", text: "SRIP at Princeton Neuroscience Institute" },
        ]
      },
      {
        id: "r5", text: "Publish or submit to undergraduate journals", priority: "medium",
        subtasks: [
          { id: "r5a", text: "Psi Chi Journal of Psychological Research — peer-reviewed, accepts undergrads" },
          { id: "r5b", text: "NYU Undergraduate Research Journal — submit any strong paper" },
          { id: "r5c", text: "Stanford Undergraduate Research Journal" },
        ]
      },
      {
        id: "r6", text: "Design senior thesis bridging painting, visual art, and psychology", priority: "critical",
        subtasks: [
          { id: "r6a", text: "Proposed topic A: 'How aesthetic engagement with visual art affects emotional regulation and mental health outcomes'" },
          { id: "r6b", text: "Proposed topic B: 'Art-making as therapeutic intervention — a study of expressive painting in clinical populations'" },
          { id: "r6c", text: "Proposed topic C: 'Visual perception and social cognition — how painters encode psychological states in non-verbal imagery'" },
          { id: "r6d", text: "Proposed topic D: 'Color, form, and affect: the perceptual psychology of visual art engagement'" },
          { id: "r6e", text: "Begin lit review during junior spring; full proposal by summer 2027" },
        ]
      },
      {
        id: "r7", text: "Aim for co-authorship or acknowledgement on a faculty paper", priority: "high",
        subtasks: [
          { id: "r7a", text: "Ask your PI directly: 'What would I need to contribute to be acknowledged or co-authored?'" },
          { id: "r7b", text: "Take on data collection, coding, or lit review tasks proactively" },
          { id: "r7c", text: "Volunteer for conference poster preparation" },
        ]
      },
    ],
  },
  {
    id: "leadership", label: "Leadership & Service", color: "#2E6B3E", accent: "#E4F5E8", icon: "◎",
    items: [
      {
        id: "l1", text: "Hold a meaningful leadership role — not just membership", priority: "critical",
        subtasks: [
          { id: "l1a", text: "Apply to be President or VP of Psi Chi (NYU chapter) in junior year" },
          { id: "l1b", text: "Apply for a leadership role in NYU Active Minds chapter" },
          { id: "l1c", text: "Consider running for position in NYU Student Government with mental health focus" },
        ]
      },
      {
        id: "l2", text: "Found or lead a club connecting visual art, painting, and mental health", priority: "high",
        subtasks: [
          { id: "l2a", text: "Proposed club: 'Pigment & Mind' — art exhibition series + psych discussion at NYU" },
          { id: "l2b", text: "Partner with NYU Steinhardt Art Therapy program and CAS Psychology" },
          { id: "l2c", text: "Host open studio painting sessions with mental health framing — documented attendance" },
          { id: "l2d", text: "Collaborate with NYU Art Gallery or Tisch for exhibition space" },
        ]
      },
      {
        id: "l3", text: "Volunteer consistently in community mental health or social services", priority: "critical",
        subtasks: [
          { id: "l3a", text: "Crisis Text Line — volunteer counselor (training provided, remote-friendly)" },
          { id: "l3b", text: "NYU Wellness Exchange peer support programs" },
          { id: "l3c", text: "NAMI NYC — volunteer, education programs, advocacy" },
          { id: "l3d", text: "The Door (NYC youth development nonprofit) — strong fit for activism interests" },
        ]
      },
      {
        id: "l4", text: "Organize a public event demonstrating civic initiative", priority: "medium",
        subtasks: [
          { id: "l4a", text: "Mental health awareness art exhibition — curate student paintings on psychological themes" },
          { id: "l4b", text: "Psychology + Visual Art symposium at NYU (invite faculty + artists + students)" },
          { id: "l4c", text: "Community mural or collaborative painting project with mental health nonprofit" },
          { id: "l4d", text: "Document attendance, impact, press coverage if any" },
        ]
      },
      {
        id: "l5", text: "Take on a leadership role in mental health advocacy", priority: "high",
        subtasks: [
          { id: "l5a", text: "Active Minds national chapter — apply for their national leadership program" },
          { id: "l5b", text: "NAMI on Campus at NYU — found chapter if none exists" },
          { id: "l5c", text: "Apply to Bring Change to Mind College Ambassador program" },
        ]
      },
      {
        id: "l6", text: "Document all leadership with measurable outcomes", priority: "high",
        subtasks: [
          { id: "l6a", text: "Keep a running log: dates, roles, people reached, concrete results" },
          { id: "l6b", text: "Get quotes or testimonials from supervisors or beneficiaries" },
          { id: "l6c", text: "Track press coverage, social media reach, event attendance numbers" },
        ]
      },
    ],
  },
  {
    id: "extracurriculars", label: "Clubs & Extracurriculars", color: "#5C3A6B", accent: "#EDE4F5", icon: "◐",
    items: [
      {
        id: "ec1", text: "Psychology & Mental Health Organizations", priority: "critical",
        subtasks: [
          { id: "ec1a", text: "Psi Chi Honor Society (NYU chapter) — join and pursue leadership" },
          { id: "ec1b", text: "Active Minds at NYU — mental health advocacy, strong for Rhodes" },
          { id: "ec1c", text: "NYU Psychology Club — networking + speaker events" },
          { id: "ec1d", text: "NAMI on Campus NYU — or found chapter if absent" },
        ]
      },
      {
        id: "ec2", text: "Visual Art & Painting Organizations", priority: "high",
        subtasks: [
          { id: "ec2a", text: "NYU Steinhardt Art Therapy student community — essential bridge between your two worlds" },
          { id: "ec2b", text: "NYU Visual Arts Society or Fine Arts club — exhibit your work publicly" },
          { id: "ec2c", text: "Washington Square Outdoor Art Exhibit — participate as a painter, build public presence" },
          { id: "ec2d", text: "Enter your paintings in juried student exhibitions — documented artistic achievement matters for Rhodes" },
          { id: "ec2e", text: "Collaborate with a mental health org to create art for an awareness campaign" },
        ]
      },
      {
        id: "ec3", text: "Activism & Social Justice Organizations", priority: "high",
        subtasks: [
          { id: "ec3a", text: "NYU Students for Mental Health Policy — or found one" },
          { id: "ec3b", text: "NYU Votes / civic engagement organizations" },
          { id: "ec3c", text: "Amnesty International NYU chapter (connects global dimension for Rhodes)" },
          { id: "ec3d", text: "NYU Social Impact Hub — entrepreneurship meets activism" },
        ]
      },
      {
        id: "ec4", text: "Interdisciplinary & Honors Programs", priority: "high",
        subtasks: [
          { id: "ec4a", text: "NYU Global Honors Program — apply if eligible (strong Rhodes signal)" },
          { id: "ec4b", text: "NYU College of Arts & Science Dean's Undergraduate Research Fund — apply for funding" },
          { id: "ec4c", text: "NYU Wasserman Center fellowships and leadership programs" },
          { id: "ec4d", text: "NYU Furman Center or McSilver Institute — policy-adjacent psych research" },
        ]
      },
    ],
  },
  {
    id: "internships", label: "Internships & Programs", color: "#2A5C6B", accent: "#DFF0F5", icon: "◑",
    items: [
      {
        id: "int1", text: "Research & Academic Internships", priority: "critical",
        subtasks: [
          { id: "int1a", text: "NSF REU — apply to 8–10 programs, due Jan–Feb each year" },
          { id: "int1b", text: "NIH Summer Internship Program (SIP) — Bethesda MD, competitive, due March 1" },
          { id: "int1c", text: "APA Summer Science Fellowships (Washington DC)" },
          { id: "int1d", text: "Columbia University Undergraduate Research in Neuroscience (if NYU lab unavailable)" },
        ]
      },
      {
        id: "int2", text: "Mental Health & Clinical Adjacent Internships", priority: "high",
        subtasks: [
          { id: "int2a", text: "NYC Department of Health and Mental Hygiene — public health internships" },
          { id: "int2b", text: "Bring Change to Mind (NYC HQ) — communications + advocacy internship" },
          { id: "int2c", text: "Child Mind Institute (NYC) — clinical research assistantship" },
          { id: "int2d", text: "The JED Foundation — college mental health policy" },
        ]
      },
      {
        id: "int3", text: "Visual Art, Painting & Psychology Crossover Opportunities", priority: "high",
        subtasks: [
          { id: "int3a", text: "American Art Therapy Association (AATA) — volunteer or intern, attend annual conference" },
          { id: "int3b", text: "MoMA or Whitney Museum Education/Research Department — art + psychology of viewing" },
          { id: "int3c", text: "NYU Steinhardt Art Therapy program — research assistant to faculty (Donna Betts or similar)" },
          { id: "int3d", text: "Creative Arts Therapies clinics (NYC has several) — observe or assist in sessions" },
          { id: "int3e", text: "Studio in a School (NYC nonprofit) — art education + youth mental health intersection" },
        ]
      },
      {
        id: "int4", text: "Courses & Programs to Take", priority: "high",
        subtasks: [
          { id: "int4a", text: "Coursera: Social Psychology (Scott Plous, Wesleyan) — supplemental depth" },
          { id: "int4b", text: "edX: The Science of Everyday Thinking (UQ) — strong for interviews" },
          { id: "int4c", text: "Summer@Brown or Columbia Summer Psychology Institute — if no lab that summer" },
          { id: "int4d", text: "UCL Psychology summer program (relevant if you're UK-curious for Oxford/Cambridge)" },
          { id: "int4e", text: "Intro to Art Therapy (Coursera/AATA) — directly bridges painting and psychology" },
          { id: "int4f", text: "Empirical Aesthetics reading group or seminar — ask NYU faculty to direct you to one" },
        ]
      },
    ],
  },
  {
    id: "global", label: "Global & Civic Dimension", color: "#6B2E5A", accent: "#F5E4F0", icon: "◍",
    items: [
      {
        id: "g1", text: "Maximize NYU London Fall 2026 semester strategically", priority: "critical",
        subtasks: [
          { id: "g1a", text: "Take at least one UCL or King's College London psych module if possible via NYU exchange" },
          { id: "g1b", text: "Visit Oxford and Cambridge — attend a public lecture, meet a grad student" },
          { id: "g1c", text: "Volunteer with a London mental health charity: Mind UK, Rethink Mental Illness, or Samaritans" },
          { id: "g1d", text: "Visit Tate Modern, Tate Britain, and the Wellcome Collection — Wellcome directly intersects art and mental health science" },
          { id: "g1g", text: "Attend a Wellcome Collection exhibition or event — their programming sits exactly at art + psychology + public health" },
          { id: "g1e", text: "Document your London experience as evidence of global perspective for Rhodes essays" },
          { id: "g1f", text: "Research UK mental health policy landscape — adds distinctive international angle to your profile" },
        ]
      },
      {
        id: "g2", text: "Engage with international visual art and mental health issues", priority: "medium",
        subtasks: [
          { id: "g2a", text: "Write about global art therapy access disparities for a student publication" },
          { id: "g2b", text: "Research how different cultures use visual art-making in mental health contexts" },
          { id: "g2c", text: "Document how your London experience of world-class art institutions shaped your research thinking" },
        ]
      },
      {
        id: "g3", text: "Write or publish publicly on a social issue", priority: "medium",
        subtasks: [
          { id: "g3a", text: "Submit an op-ed to NYU Washington Square News about visual art and mental health" },
          { id: "g3b", text: "Start a Substack blending psychology research and your painting practice — build an audience" },
          { id: "g3c", text: "Pitch to The Conversation (academic public writing platform) on empirical aesthetics" },
          { id: "g3d", text: "Create an Instagram documenting your painting practice through a psychological lens — public intellectual presence" },
        ]
      },
      {
        id: "g4", text: "Define your global 'fight' — the problem you'll dedicate your career to", priority: "critical",
        subtasks: [
          { id: "g4a", text: "Draft one paragraph answer: 'What injustice or human problem drives your work?'" },
          { id: "g4b", text: "Connect it to both your painting practice and your psychology research — they reinforce each other" },
          { id: "g4c", text: "Test it in conversation — can you articulate it compellingly in 60 seconds?" },
          { id: "g4d", text: "Candidate framing: 'I want to understand how visual art-making changes how people relate to their own psychological pain — and build evidence-based interventions from that'" },
        ]
      },
    ],
  },
  {
    id: "oxford", label: "Rhodes · Oxford", color: "#6B2020", accent: "#F5E8E8", icon: "◇", school: "Oxford",
    items: [
      {
        id: "o1", text: "Research Oxford graduate programs in Experimental Psychology or Social Intervention", priority: "high",
        subtasks: [
          { id: "o1a", text: "MSc Experimental Psychology at Oxford — check entry requirements" },
          { id: "o1b", text: "MSc Social Intervention and Policy Evaluation — strong fit for your civic interests" },
          { id: "o1c", text: "DPhil (PhD) Psychology — requires clear research proposal" },
        ]
      },
      {
        id: "o2", text: "Connect with NYU Prestigious Fellowships Office now", priority: "critical",
        subtasks: [
          { id: "o2a", text: "Email NYU Fellowships Advising: fellowships@nyu.edu — introduce yourself this month" },
          { id: "o2b", text: "Attend all fellowships information sessions in junior year" },
          { id: "o2c", text: "Request a one-on-one advising meeting by September 2026" },
        ]
      },
      {
        id: "o3", text: "Read Cecil Rhodes' will and understand the scholarship's values", priority: "medium",
        subtasks: [
          { id: "o3a", text: "Read the Rhodes Trust's current selection criteria carefully" },
          { id: "o3b", text: "Note the four criteria: academics, character, leadership, athletics/extracurriculars" },
        ]
      },
      {
        id: "o4", text: "Study past Rhodes Scholars' profiles and essays", priority: "medium",
        subtasks: [
          { id: "o4a", text: "Read 5+ Rhodes Scholar profiles in psychology or social sciences" },
          { id: "o4b", text: "Identify common threads in successful applicants" },
          { id: "o4c", text: "Note: many Rhodes Scholars have one outstanding, distinctive achievement — build yours" },
        ]
      },
      {
        id: "o5", text: "Draft your personal narrative: painting → psychology → Oxford", priority: "critical",
        subtasks: [
          { id: "o5a", text: "Hook: the moment your painting practice made you ask a psychological question about how art changes inner states" },
          { id: "o5b", text: "Turn: how that question drove you to study psychology at NYU — painting isn't abandoned, it's the lens" },
          { id: "o5c", text: "Now: your research in empirical aesthetics or art therapy, your leadership, your exhibitions" },
          { id: "o5d", text: "Oxford: specific program, specific faculty, specific contribution you'll make at the intersection of art and psychological science" },
        ]
      },
      {
        id: "o6", text: "Secure 6–8 recommendation letters", priority: "critical",
        subtasks: [
          { id: "o6a", text: "2 research supervisors (most important)" },
          { id: "o6b", text: "2 faculty from courses (must know you well)" },
          { id: "o6c", text: "1–2 community/service leaders" },
          { id: "o6d", text: "1 character reference (mentor, employer)" },
          { id: "o6e", text: "Brief each writer on your Rhodes narrative so letters cohere" },
        ]
      },
      {
        id: "o7", text: "Prepare for Rhodes interview — conversational, wide-ranging", priority: "high",
        subtasks: [
          { id: "o7a", text: "Practice discussing any global issue for 5 minutes with depth" },
          { id: "o7b", text: "Prepare to discuss your thesis, your field, and current events" },
          { id: "o7c", text: "Practice with NYU fellowships office mock interviews" },
          { id: "o7d", text: "Read The Economist weekly starting junior year" },
        ]
      },
      {
        id: "o8", text: "Submit NYU institutional endorsement application", priority: "critical",
        subtasks: [
          { id: "o8a", text: "Typical NYU internal deadline: August 2027 — confirm with fellowships office" },
          { id: "o8b", text: "Rhodes national deadline: typically first Tuesday of October" },
          { id: "o8c", text: "Start application materials 6 months before deadline" },
        ]
      },
    ],
  },
  {
    id: "cambridge", label: "Cambridge", color: "#1A4A35", accent: "#E2F0EA", icon: "◆", school: "Cambridge",
    items: [
      {
        id: "cam1", text: "Identify target Cambridge department", priority: "critical",
        subtasks: [
          { id: "cam1a", text: "MPhil Psychology — check if research-based or taught" },
          { id: "cam1b", text: "MPhil Biological Science (Psychiatry) — clinical direction" },
          { id: "cam1c", text: "MPhil Public Health — policy angle" },
        ]
      },
      {
        id: "cam2", text: "Research and contact Cambridge supervisors early", priority: "critical",
        subtasks: [
          { id: "cam2a", text: "Prof. Paul Fletcher (Psychiatry, psychosis, narrative) — strong potential fit" },
          { id: "cam2b", text: "Prof. Barbara Sahakian (Cognitive neuroscience, mental health)" },
          { id: "cam2c", text: "Email 2–3 faculty in junior fall with a brief research interest letter" },
        ]
      },
      {
        id: "cam3", text: "Understand Cambridge application process", priority: "high",
        subtasks: [
          { id: "cam3a", text: "Apply via University of Cambridge Applicant Portal" },
          { id: "cam3b", text: "Academic references only (no personal/character refs)" },
          { id: "cam3c", text: "Deadline: typically December–January" },
        ]
      },
      {
        id: "cam4", text: "Write research proposal (1,500–2,000 words)", priority: "critical",
        subtasks: [
          { id: "cam4a", text: "Must name potential supervisor and connect to their work" },
          { id: "cam4b", text: "Should link directly to your thesis work" },
          { id: "cam4c", text: "Draft by August 2027 — refine with advisor feedback" },
        ]
      },
      {
        id: "cam5", text: "Prepare writing sample", priority: "high",
        subtasks: [
          { id: "cam5a", text: "Best option: polished senior thesis chapter" },
          { id: "cam5b", text: "Alternative: published undergraduate journal paper" },
        ]
      },
      {
        id: "cam6", text: "Investigate Gates Cambridge Scholarship", priority: "critical",
        subtasks: [
          { id: "cam6a", text: "Open to non-UK students — full funding" },
          { id: "cam6b", text: "Requires separate Gates application after Cambridge admission offer" },
          { id: "cam6c", text: "Gates selects for intellectual ability + leadership + commitment to improving lives" },
        ]
      },
      {
        id: "cam7", text: "Frame 'why Cambridge' around specific labs and supervisors", priority: "high",
        subtasks: [
          { id: "cam7a", text: "Name 2 faculty members specifically in your SOP" },
          { id: "cam7b", text: "Explain methodological fit: what does Cambridge offer that NYU doesn't?" },
        ]
      },
    ],
  },
  {
    id: "harvard", label: "Harvard", color: "#7A1E1E", accent: "#F5EAEA", icon: "◆", school: "Harvard",
    items: [
      {
        id: "harv1", text: "Identify target Harvard PhD program", priority: "critical",
        subtasks: [
          { id: "harv1a", text: "Psychology PhD — social, clinical, developmental, or cognitive track" },
          { id: "harv1b", text: "Human Development & Education (HGSE) — developmental psych focus" },
          { id: "harv1c", text: "Mind, Brain & Behavior (MBB) interdisciplinary program" },
        ]
      },
      {
        id: "harv2", text: "Research 2–3 Harvard faculty and read their recent papers", priority: "critical",
        subtasks: [
          { id: "harv2a", text: "Prof. Matthew Nock (clinical psychology, self-harm, methodology)" },
          { id: "harv2b", text: "Prof. Mahzarin Banaji (social cognition, implicit bias)" },
          { id: "harv2c", text: "Prof. Ellen Langer (mindfulness, social psychology)" },
          { id: "harv2d", text: "Read their 3 most recent papers before any email or application" },
        ]
      },
      {
        id: "harv3", text: "Email target faculty before applying", priority: "high",
        subtasks: [
          { id: "harv3a", text: "Email by September 2027 — brief, specific, cite their paper" },
          { id: "harv3b", text: "Mention your thesis and how it connects to their work" },
          { id: "harv3c", text: "Ask a specific question about their lab's current direction" },
        ]
      },
      {
        id: "harv4", text: "Build CV to meet Harvard's high research bar", priority: "critical",
        subtasks: [
          { id: "harv4a", text: "2+ years of lab experience minimum" },
          { id: "harv4b", text: "At least one poster presentation or publication" },
          { id: "harv4c", text: "Strong quant skills: R, SPSS, or Python for data analysis" },
        ]
      },
      {
        id: "harv5", text: "Prepare tailored Statement of Purpose", priority: "critical",
        subtasks: [
          { id: "harv5a", text: "Name 2–3 specific Harvard faculty and why each specifically" },
          { id: "harv5b", text: "Describe your thesis and how it leads naturally to PhD research at Harvard" },
          { id: "harv5c", text: "Draft October 2027, refine November 2027" },
        ]
      },
      {
        id: "harv6", text: "Harvard administrative requirements", priority: "medium",
        subtasks: [
          { id: "harv6a", text: "Confirm GRE requirement status for your application year" },
          { id: "harv6b", text: "Request 3 recommendation letters by October 2027 (give recommenders 6 weeks)" },
          { id: "harv6c", text: "Deadline: December 1, 2027 — submit by November 15" },
        ]
      },
    ],
  },
  {
    id: "stanford", label: "Stanford", color: "#7A3A1A", accent: "#F5EDE6", icon: "◆", school: "Stanford",
    items: [
      {
        id: "stan1", text: "Identify target Stanford program", priority: "critical",
        subtasks: [
          { id: "stan1a", text: "Psychology PhD — social, developmental, or cognitive track" },
          { id: "stan1b", text: "Joint Social Psychology / Organizational Behavior (GSB) track" },
          { id: "stan1c", text: "Stanford Human-Computer Interaction or Visual Cognition lab — if interested in perceptual angle" },
        ]
      },
      {
        id: "stan2", text: "Research Stanford faculty and labs", priority: "high",
        subtasks: [
          { id: "stan2a", text: "SPARQ Lab (Social Psychological Answers to Real-world Questions) — Walton, Yeager" },
          { id: "stan2b", text: "Prof. Jamil Zaki (empathy, social neuroscience) — very strong fit" },
          { id: "stan2c", text: "Prof. Jennifer Eberhardt (social psychology, bias, visual perception)" },
          { id: "stan2d", text: "Prof. Arnold Kriegeskorte (visual neuroscience) — if interested in perceptual basis of aesthetic experience" },
        ]
      },
      {
        id: "stan3", text: "Frame your research with applied real-world impact", priority: "critical",
        subtasks: [
          { id: "stan3a", text: "Stanford values intervention research — 'how do we fix this?' framing" },
          { id: "stan3b", text: "Connect your painting background to visual perception, emotion regulation, and behavior change applications" },
          { id: "stan3c", text: "Pitch: 'I study how visual art-making and aesthetic engagement can be used as tools for mental health intervention'" },
        ]
      },
      {
        id: "stan4", text: "Prepare Stanford SOP and research statement", priority: "critical",
        subtasks: [
          { id: "stan4a", text: "Lead with your painting → psychology story — Stanford loves non-linear, cross-disciplinary paths" },
          { id: "stan4b", text: "Name SPARQ or another specific lab and explain methodological fit" },
          { id: "stan4c", text: "Deadline: early December 2027" },
        ]
      },
    ],
  },
  {
    id: "yale", label: "Yale", color: "#1A3A5C", accent: "#E6EEF5", icon: "◆", school: "Yale",
    items: [
      {
        id: "yale1", text: "Identify target Yale program and track", priority: "critical",
        subtasks: [
          { id: "yale1a", text: "Psychology PhD — clinical science, social, or cognitive track" },
          { id: "yale1b", text: "Health, Mind & Society initiative — interdisciplinary, very strong fit" },
          { id: "yale1c", text: "Cognitive Science Program — alternative route" },
        ]
      },
      {
        id: "yale2", text: "Research Yale faculty", priority: "critical",
        subtasks: [
          { id: "yale2a", text: "Prof. Alan Kazdin (child psychology, parenting interventions)" },
          { id: "yale2b", text: "Prof. Woo-kyoung Ahn (clinical cognition, how people understand mental illness)" },
          { id: "yale2c", text: "Prof. Laurie Santos (comparative cognition, wellbeing — The Good Life course)" },
          { id: "yale2d", text: "Confirm which faculty are accepting students for 2028 intake" },
        ]
      },
      {
        id: "yale3", text: "Demonstrate theoretical depth in application", priority: "high",
        subtasks: [
          { id: "yale3a", text: "Yale SOP must show command of the psychological literature, not just your experience" },
          { id: "yale3b", text: "Cite specific theoretical debates your thesis engages with" },
          { id: "yale3c", text: "Deadline: December 1, 2027" },
        ]
      },
    ],
  },
  {
    id: "princeton", label: "Princeton", color: "#4A3A0A", accent: "#F5F0E0", icon: "◆", school: "Princeton",
    items: [
      {
        id: "prin1", text: "Understand Princeton's structure — no standalone Psych PhD", priority: "critical",
        subtasks: [
          { id: "prin1a", text: "Route: Princeton Neuroscience Institute (PNI) PhD" },
          { id: "prin1b", text: "Alternative: School of Public and International Affairs (SPIA) for policy angle" },
          { id: "prin1c", text: "Psychology sits within Neuroscience — prepare computationally" },
        ]
      },
      {
        id: "prin2", text: "Research PNI faculty", priority: "critical",
        subtasks: [
          { id: "prin2a", text: "Prof. Uri Hasson (neural coupling, story comprehension, communication) — exceptional fit" },
          { id: "prin2b", text: "Prof. Diana Tamir (social cognition, mental state inference)" },
          { id: "prin2c", text: "Prof. Yael Niv (reinforcement learning, computational psychiatry)" },
          { id: "prin2d", text: "Email faculty by September 2027 — Princeton faculty buy-in is critical" },
        ]
      },
      {
        id: "prin3", text: "Build computational skills to compete at Princeton", priority: "high",
        subtasks: [
          { id: "prin3a", text: "Learn R and Python for psychology data analysis" },
          { id: "prin3b", text: "Take an intro stats or computational modeling course" },
          { id: "prin3c", text: "Your painting × psychology angle is a sharp differentiator at Princeton given its computationally-dominant cohort" },
        ]
      },
    ],
  },
  {
    id: "narrative", label: "Your Unique Angle", color: "#3D2A6B", accent: "#EDE8F5", icon: "◈",
    items: [
      {
        id: "n1", text: "Articulate why painting makes you a more insightful psychologist", priority: "critical",
        subtasks: [
          { id: "n1a", text: "Draft version: 'Painting taught me to observe — to read affect in posture, color in emotion, tension in composition. That same attentiveness is what psychology demands of a researcher'" },
          { id: "n1b", text: "Draft version 2: 'My painting practice gave me a pre-theoretical language for internal states — I came to psychology to make that language rigorous'" },
          { id: "n1c", text: "Refine until you can say it naturally in 20 seconds without it sounding rehearsed" },
          { id: "n1d", text: "Use it in every SOP opening — it is genuinely rare and committees will remember it" },
        ]
      },
      {
        id: "n2", text: "Frame every CV entry through your interdisciplinary identity", priority: "high",
        subtasks: [
          { id: "n2a", text: "Painting experience → 'sustained practice in visual observation, non-verbal emotional expression, and perceptual analysis'" },
          { id: "n2b", text: "Art exhibitions → 'public communication of psychological themes through visual medium'" },
          { id: "n2c", text: "Every role should connect to either visual art, psychology, or both — make the thread obvious" },
        ]
      },
      {
        id: "n3", text: "Use your artistic sensibility to write the most distinctive SOP in the cohort", priority: "critical",
        subtasks: [
          { id: "n3a", text: "Open with a specific painting moment — a colour decision, a subject's expression — that made you ask a psychological question" },
          { id: "n3b", text: "Painters see differently. Let that show in how you write — precise, visual, specific" },
          { id: "n3c", text: "Get feedback from faculty, the fellowships office, and someone whose literary taste you trust" },
        ]
      },
      {
        id: "n4", text: "Identify 2–3 paintings or art experiences that reveal psychological insight", priority: "medium",
        subtasks: [
          { id: "n4a", text: "Which subject did you paint that forced you to deeply inhabit their emotional state?" },
          { id: "n4b", text: "Which painting required you to research a psychological or social condition to portray it honestly?" },
          { id: "n4c", text: "Which artwork — yours or another's — first made you think seriously about how visual art changes internal states?" },
          { id: "n4d", text: "These become anecdotes in your Rhodes interview and SOP openings" },
        ]
      },
      {
        id: "n5", text: "Build a coherent, visible public intellectual identity", priority: "critical",
        subtasks: [
          { id: "n5a", text: "Your throughline: 'I study how visual art-making shapes the mind — as a painter and as a scientist'" },
          { id: "n5b", text: "This is consistent across LinkedIn, any publications, CV, SOP, and Rhodes interview" },
          { id: "n5c", text: "Consider a personal website: claudiapak.com — portfolio of paintings + research + writing in one place" },
          { id: "n5d", text: "A painter who is also a rigorous psychologist is genuinely rare — own it explicitly" },
        ]
      },
      {
        id: "n6", text: "Leverage painting as a practical research tool, not just a background fact", priority: "high",
        subtasks: [
          { id: "n6a", text: "Propose a study that uses your original paintings as stimuli — gives you unique experimental materials" },
          { id: "n6b", text: "Your ability to create controlled visual stimuli from scratch is a genuine research asset" },
          { id: "n6c", text: "Discuss this with potential faculty advisors — it could differentiate your thesis proposal" },
          { id: "n6d", text: "Document your painting practice academically: artist statements, process notes — builds the case that it's serious" },
        ]
      },
    ],
  },
];

const priorityConfig = {
  critical: { label: "Critical", dot: "#D13B2A", bg: "#FEF0EE" },
  high:     { label: "High",     dot: "#B07D2A", bg: "#FDF5E6" },
  medium:   { label: "Medium",   dot: "#2A6B8A", bg: "#E8F4F8" },
};

const schoolGroups = {
  core:    ["academic", "research", "leadership", "extracurriculars", "internships", "global", "narrative"],
  schools: ["oxford", "cambridge", "harvard", "stanford", "yale", "princeton"],
};

// ── SUMMER PLAN ───────────────────────────────────────────────────────────────

const summerPlan = [
  {
    id: "wk1", week: "June 7–20", phase: "Launch", color: "#7C5C2E", accent: "#F5ECD7",
    tasks: [
      { id: "wk1t1", text: "Email 5 NYU faculty for lab positions — prioritize Emily Balcetis (visual perception) and Jay Van Bavel (social psych)" },
      { id: "wk1t2", text: "Email NYU Fellowships Office to introduce yourself and request a meeting" },
      { id: "wk1t3", text: "Create or update LinkedIn with psychology + visual art focus" },
      { id: "wk1t4", text: "Read 5 foundational papers in empirical aesthetics and art therapy (start with Semir Zeki, Ellen Winner)" },
      { id: "wk1t5", text: "Begin GPA audit: map every remaining required course and target grade" },
      { id: "wk1t6", text: "Set up a personal website: claudiapak.com — portfolio of paintings + research interests in one place" },
    ]
  },
  {
    id: "wk2", week: "June 21 – July 4", phase: "Research & Art Practice", color: "#1D5E72", accent: "#E0F2F7",
    tasks: [
      { id: "wk2t1", text: "Follow up on unanswered faculty emails — resend with one new specific hook" },
      { id: "wk2t2", text: "Begin writing 'why psychology' personal statement draft: open with a painting moment, not a fact" },
      { id: "wk2t3", text: "Research NSF REU programs in psychology — bookmark 8–10 targets for November applications" },
      { id: "wk2t4", text: "Research Active Minds and Psi Chi chapter structure at NYU — plan to join both in fall" },
      { id: "wk2t5", text: "Read Cecil Rhodes' selection criteria and 3 past scholar profiles in social sciences" },
      { id: "wk2t6", text: "Begin a painting series on a psychological theme — document the process; this becomes content and evidence of serious practice" },
    ]
  },
  {
    id: "wk3", week: "July 5–18", phase: "Deepen & Build", color: "#2E6B3E", accent: "#E4F5E8",
    tasks: [
      { id: "wk3t1", text: "If lab email accepted: schedule first meeting, prepare 3 intelligent questions about their current work" },
      { id: "wk3t2", text: "Write first op-ed draft for NYU Washington Square News (topic: visual art and mental health — what the research says)" },
      { id: "wk3t3", text: "Map out NYU London fall courses — identify any psychology-adjacent or art-adjacent modules at partner universities" },
      { id: "wk3t4", text: "Research London mental health volunteer opportunities: Mind UK, Samaritans, or Wellcome Collection volunteer programs" },
      { id: "wk3t5", text: "Visit Wellcome Collection website — plan to attend events in London that sit at art × science intersection" },
      { id: "wk3t6", text: "Begin reading: 'The Art Instinct' (Denis Dutton) + 'The Body Keeps the Score' (van der Kolk)" },
    ]
  },
  {
    id: "wk4", week: "July 19 – Aug 1", phase: "Output & Apply", color: "#6B2E5A", accent: "#F5E4F0",
    tasks: [
      { id: "wk4t1", text: "Finalize and submit op-ed to Washington Square News" },
      { id: "wk4t2", text: "Draft thesis topic in 200 words — frame it around your painting background: e.g. 'How aesthetic engagement with visual art affects emotional regulation'" },
      { id: "wk4t3", text: "Research Crisis Text Line volunteer onboarding — sign up (remote, training provided)" },
      { id: "wk4t4", text: "Identify 3 NYC internships to apply for: Child Mind Institute, NYU Steinhardt Art Therapy lab, Bring Change to Mind" },
      { id: "wk4t5", text: "Continue lab work if started; if not, email 2 more faculty with revised approach" },
      { id: "wk4t6", text: "Write a short artist statement connecting your painting practice to your psychology research interests — 200 words" },
    ]
  },
  {
    id: "wk5", week: "Aug 2–27", phase: "London Prep & Consolidate", color: "#3D2A6B", accent: "#EDE8F5",
    tasks: [
      { id: "wk5t1", text: "Prepare a 'London plan': Wellcome Collection visits, volunteer commitments, Oxford/Cambridge visit dates, academic targets" },
      { id: "wk5t2", text: "Email NYU London advisor about psychology-adjacent course options and any art therapy or visual cognition modules" },
      { id: "wk5t3", text: "Research Tate Modern and Tate Britain education/events programs — attend at least 2 during the semester" },
      { id: "wk5t4", text: "Draft a 1-page research statement: your painting background, your psychological questions, your methods" },
      { id: "wk5t5", text: "Confirm lab position or regroup — identify backup faculty to contact remotely from London in September" },
      { id: "wk5t6", text: "Pack: bring painting supplies and your draft personal statement to refine in London — both matter" },
    ]
  },
];

// ── TIMELINE ──────────────────────────────────────────────────────────────────

const timelineMilestones = [
  { date: new Date(2026, 5, 7),  label: "Now",      desc: "Summer — launch lab outreach, fellowships intro", phase: 0, urgent: true },
  { date: new Date(2026, 7, 27), label: "Aug 27",   desc: "Depart for NYU London", phase: 0 },
  { date: new Date(2026, 8, 1),  label: "Sep '26",  desc: "Junior year begins (London) — volunteer, visit Oxford/Cambridge", phase: 0 },
  { date: new Date(2026, 11, 1), label: "Dec '26",  desc: "Return from London — confirm lab for spring", phase: 1 },
  { date: new Date(2027, 0, 1),  label: "Jan '27",  desc: "Begin honors thesis proposal + REU applications", phase: 1 },
  { date: new Date(2027, 2, 1),  label: "Mar '27",  desc: "NSF REU/NIH SIP deadline — submit all", phase: 1 },
  { date: new Date(2027, 4, 1),  label: "May '27",  desc: "Junior year ends — present at research symposium", phase: 1 },
  { date: new Date(2027, 5, 1),  label: "Jun '27",  desc: "Summer research fellowship — intensive lab work", phase: 2 },
  { date: new Date(2027, 7, 1),  label: "Aug '27",  desc: "NYU Rhodes endorsement application due", phase: 2 },
  { date: new Date(2027, 8, 1),  label: "Sep '27",  desc: "Begin all SOPs — email grad faculty", phase: 2 },
  { date: new Date(2027, 9, 1),  label: "Oct '27",  desc: "🎯 Rhodes Scholarship deadline", phase: 2, deadline: true },
  { date: new Date(2027, 10, 15),label: "Nov '27",  desc: "Submit Harvard, Yale, Princeton, Stanford", phase: 2, deadline: true },
  { date: new Date(2027, 11, 15),label: "Dec '27",  desc: "🎓 Cambridge deadline — all apps done", phase: 2, deadline: true },
];

const phaseConfig = [
  { label: "Junior Year",   color: "#7C5C2E", span: "Jun 2026 – Dec 2026" },
  { label: "Senior Prep",   color: "#1D5E72", span: "Jan 2027 – May 2027" },
  { label: "Applications",  color: "#6B2020", span: "Jun 2027 – Dec 2027" },
];

// ── READINESS ASSESSMENT ──────────────────────────────────────────────────────

function ReadinessPanel() {
  const strengths = [
    "NYU is a well-regarded institution for Rhodes — has produced scholars",
    "Painter + psychologist is a genuinely rare profile — empirical aesthetics and art therapy are under-studied, high-impact fields",
    "London semester adds international depth and direct access to world-class institutions (Wellcome Collection, Tate, Oxford, Cambridge)",
    "You are asking the right questions at the right time — 2 years out is ideal to start building this profile",
    "Interests (visual art, painting, mental health, social psychology, activism, cognitive psych) form a coherent, compelling research identity",
    "Your painting practice means you can create original experimental stimuli — a practical research advantage very few psychologists have",
  ];
  const gaps = [
    { item: "GPA: 3.843 is below the 3.9 average for Rhodes Scholars — 2 years to close this gap", severity: "high" },
    { item: "No confirmed lab yet — research experience is the single most important gap to close immediately", severity: "critical" },
    { item: "No leadership role yet — must establish by junior fall (London semester complicates timing)", severity: "high" },
    { item: "No publications or presentations yet — achievable by senior year but requires starting now", severity: "medium" },
    { item: "NYU London semester reduces on-campus network building in junior fall — plan remote strategies", severity: "medium" },
  ];
  const verdict = "ACHIEVABLE with immediate action. The 2027 Rhodes deadline gives you 16 months of preparation — tight but realistic if you secure a lab this summer and establish a leadership role by spring 2027. The GPA gap is closeable with straight A's junior year. Your profile as a painter-turned-psychologist studying visual art and mental health is genuinely distinctive — this combination does not walk into Rhodes interviews often. The risk is not starting: every month without a lab makes the research timeline harder.";

  return (
    <div>
      <div style={{ display: "flex", gap: 16, marginBottom: 24, flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 240, background: "#E8F5EC", border: "1px solid #2E6B3E22", borderLeft: "3px solid #2E6B3E", borderRadius: 8, padding: "16px 18px" }}>
          <div style={{ fontSize: 11, fontFamily: "system-ui", fontWeight: 700, color: "#2E6B3E", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>Your Strengths</div>
          {strengths.map((s, i) => (
            <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8, alignItems: "flex-start" }}>
              <span style={{ color: "#2E6B3E", fontSize: 14, flexShrink: 0, marginTop: 1 }}>✓</span>
              <span style={{ fontSize: 12, fontFamily: "system-ui", color: "#1A3A22", lineHeight: 1.5 }}>{s}</span>
            </div>
          ))}
        </div>
        <div style={{ flex: 1, minWidth: 240, background: "#FEF5F4", border: "1px solid #D13B2A22", borderLeft: "3px solid #D13B2A", borderRadius: 8, padding: "16px 18px" }}>
          <div style={{ fontSize: 11, fontFamily: "system-ui", fontWeight: 700, color: "#D13B2A", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>Gaps to Close</div>
          {gaps.map((g, i) => (
            <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8, alignItems: "flex-start" }}>
              <span style={{ color: g.severity === "critical" ? "#D13B2A" : g.severity === "high" ? "#B07D2A" : "#2A6B8A", fontSize: 12, flexShrink: 0, marginTop: 2 }}>
                {g.severity === "critical" ? "⚠" : g.severity === "high" ? "△" : "○"}
              </span>
              <span style={{ fontSize: 12, fontFamily: "system-ui", color: "#3A1A1A", lineHeight: 1.5 }}>{g.item}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ background: "#F5ECD7", border: "1px solid #7C5C2E30", borderLeft: "3px solid #7C5C2E", borderRadius: 8, padding: "16px 18px" }}>
        <div style={{ fontSize: 11, fontFamily: "system-ui", fontWeight: 700, color: "#7C5C2E", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>Verdict: 2027 Deadline</div>
        <p style={{ margin: 0, fontSize: 13, fontFamily: "system-ui", color: "#3A2A10", lineHeight: 1.7 }}>{verdict}</p>
      </div>
    </div>
  );
}

// ── TIMELINE PANEL ────────────────────────────────────────────────────────────

function TimelinePanel() {
  const now = new Date(2026, 5, 7);
  const start = timelineMilestones[0].date;
  const end = timelineMilestones[timelineMilestones.length - 1].date;
  const totalMs = end - start;
  const nowPct = Math.max(0, Math.min(100, ((now - start) / totalMs) * 100));

  const deadlines = [
    { label: "Rhodes Deadline", date: "Oct 2027",  days: Math.ceil((new Date(2027,9,1)-now)/86400000),  color: "#6B2020", accent: "#F5E8E8" },
    { label: "Harvard/Yale/Princeton/Stanford", date: "Dec 1, 2027", days: Math.ceil((new Date(2027,11,1)-now)/86400000), color: "#7A1E1E", accent: "#F5EAEA" },
    { label: "Cambridge", date: "Jan 2028", days: Math.ceil((new Date(2028,0,15)-now)/86400000), color: "#1A4A35", accent: "#E2F0EA" },
  ];

  return (
    <div>
      {/* Countdown cards */}
      <div style={{ display: "flex", gap: 12, marginBottom: 32, flexWrap: "wrap" }}>
        {deadlines.map((d) => (
          <div key={d.label} style={{ flex: 1, minWidth: 160, padding: "16px 18px", background: d.accent, borderRadius: 10, border: `1px solid ${d.color}20`, borderLeft: `3px solid ${d.color}` }}>
            <div style={{ fontSize: 11, color: d.color, fontFamily: "system-ui", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 4 }}>{d.label}</div>
            <div style={{ fontSize: 28, fontWeight: 300, color: d.color, fontFamily: "system-ui", lineHeight: 1 }}>{d.days}</div>
            <div style={{ fontSize: 11, color: d.color, fontFamily: "system-ui", opacity: 0.7, marginTop: 2 }}>days · {d.date}</div>
          </div>
        ))}
      </div>

      {/* Phase legend */}
      <div style={{ display: "flex", gap: 20, marginBottom: 20, flexWrap: "wrap" }}>
        {phaseConfig.map((p) => (
          <div key={p.label} style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <div style={{ width: 10, height: 10, borderRadius: 2, background: p.color }} />
            <span style={{ fontSize: 11, fontFamily: "system-ui", color: "#888" }}>{p.label} <span style={{ color: "#CCC" }}>· {p.span}</span></span>
          </div>
        ))}
      </div>

      {/* Timeline bar */}
      <div style={{ height: 8, background: "#E8E4DA", borderRadius: 4, position: "relative", marginBottom: 4 }}>
        <div style={{ position: "absolute", top: 0, left: 0, width: "36%", height: "100%", background: "#7C5C2E", opacity: 0.15, borderRadius: "4px 0 0 4px" }} />
        <div style={{ position: "absolute", top: 0, left: "36%", width: "28%", height: "100%", background: "#1D5E72", opacity: 0.15 }} />
        <div style={{ position: "absolute", top: 0, left: "64%", width: "36%", height: "100%", background: "#6B2020", opacity: 0.15, borderRadius: "0 4px 4px 0" }} />
        <div style={{ position: "absolute", top: 0, left: 0, width: `${nowPct}%`, height: "100%", background: "linear-gradient(90deg,#7C5C2E,#C8A050)", borderRadius: 4 }} />
        <div style={{ position: "absolute", top: "50%", left: `${nowPct}%`, transform: "translate(-50%,-50%)", width: 14, height: 14, borderRadius: "50%", background: "#8A6A30", border: "3px solid #FFF", boxShadow: "0 0 0 2px #8A6A30", zIndex: 10 }} />
      </div>

      {/* Milestones — two rows, staggered to prevent overlap */}
      <div style={{ position: "relative", height: 130, marginTop: 8 }}>
        {timelineMilestones.map((m, i) => {
          const pct = ((m.date - start) / totalMs) * 100;
          const isPast = m.date <= now;
          const topOffset = i % 2 === 0 ? 0 : 60;
          const phColor = phaseConfig[m.phase]?.color || "#888";
          return (
            <div key={i} style={{ position: "absolute", left: `${pct}%`, top: topOffset, transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", width: 88 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: m.deadline ? "#D13B2A" : isPast ? phColor : "#D0C8BC", border: `2px solid ${m.deadline ? "#D13B2A" : isPast ? phColor : "#CCC"}`, boxShadow: m.deadline ? "0 0 0 3px #D13B2A22" : isPast ? `0 0 0 3px ${phColor}22` : "none", marginBottom: 5 }} />
              <div style={{ fontSize: 9, fontFamily: "system-ui", fontWeight: 700, color: m.deadline ? "#D13B2A" : isPast ? phColor : "#BBB", textAlign: "center", whiteSpace: "nowrap", letterSpacing: "0.02em" }}>{m.label}</div>
              <div style={{ fontSize: 8.5, fontFamily: "system-ui", color: "#AAA", textAlign: "center", lineHeight: 1.35, marginTop: 2, maxWidth: 86 }}>{m.desc}</div>
            </div>
          );
        })}
      </div>

      {/* Where you are callout */}
      <div style={{ marginTop: 20, padding: "14px 18px", background: "#F5ECD7", borderRadius: 8, border: "1px solid #7C5C2E20", borderLeft: "3px solid #7C5C2E", fontFamily: "system-ui", fontSize: 13, color: "#5A3E10", lineHeight: 1.6 }}>
        <span style={{ fontWeight: 600 }}>You are here — Summer 2026, heading into Junior Year.</span> You have <strong>~16 months</strong> until the Rhodes deadline. You are in London for junior fall, which is an asset for the application but means you must establish lab and leadership connections <em>before</em> you leave (Aug 27). <span style={{ fontWeight: 600 }}>This summer is your most critical window.</span>
      </div>
    </div>
  );
}

// ── SUMMER PLAN PANEL ─────────────────────────────────────────────────────────

function SummerPanel({ checked, onToggle, weekColor, summerData, onEditTask, onDeleteTask, onAddTask, onDeleteWeekTask }) {
  const [openWeek, setOpenWeek] = useState(0);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [addingWeek, setAddingWeek] = useState(null);
  const [newTaskText, setNewTaskText] = useState("");

  const startEdit = (task) => { setEditingId(task.id); setEditText(task.text); };
  const submitEdit = () => {
    if (editText.trim()) onEditTask(editingId, editText.trim());
    setEditingId(null); setEditText("");
  };

  const submitAdd = (weekId) => {
    if (!newTaskText.trim()) return;
    onAddTask(weekId, newTaskText.trim());
    setNewTaskText("");
    setAddingWeek(null);
  };

  return (
    <div>
      <p style={{ margin: "0 0 24px 0", fontSize: 13, fontFamily: "system-ui", color: "#888", lineHeight: 1.6 }}>
        You have June 7 – August 27 (12 weeks). This is the highest-leverage window before applications begin. Every week below maps to a concrete set of actions — check items off, edit, or add your own.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {summerData.map((week, i) => {
          const doneCount = week.tasks.filter((t) => checked[t.id]).length;
          return (
          <div key={week.id} style={{ background: "#FFFFFF", border: `1px solid ${openWeek === i ? week.color + "40" : "#E8E4DA"}`, borderLeft: `3px solid ${week.color}`, borderRadius: 8, overflow: "hidden", transition: "all 0.2s ease", boxShadow: openWeek === i ? "0 2px 8px rgba(0,0,0,0.06)" : "none" }}>
            <button onClick={() => setOpenWeek(openWeek === i ? -1 : i)} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 18px", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: week.color, flexShrink: 0 }} />
                <span style={{ fontSize: 13, fontFamily: "system-ui", fontWeight: 600, color: week.color }}>{week.week}</span>
                <span style={{ fontSize: 12, fontFamily: "system-ui", color: "#AAA", fontStyle: "italic" }}>{week.phase}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 11, fontFamily: "system-ui", color: "#CCC" }}>{doneCount}/{week.tasks.length}</span>
                <span style={{ fontSize: 16, color: "#CCC", transform: openWeek === i ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>▾</span>
              </div>
            </button>
            {openWeek === i && (
              <div style={{ padding: "0 18px 16px 18px", background: week.accent + "55" }}>
                {week.tasks.map((task) => {
                  const isChecked = !!checked[task.id];
                  const isEditing = editingId === task.id;
                  return (
                    <div key={task.id} style={{ display: "flex", gap: 10, marginBottom: 8, alignItems: "flex-start" }}>
                      {/* Checkbox replacing the old arrow */}
                      <div onClick={() => onToggle(task.id)} style={{ width: 16, height: 16, flexShrink: 0, marginTop: 2, border: `1.5px solid ${isChecked ? week.color : "#D0C8BC"}`, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", background: isChecked ? week.accent : "#FFF", cursor: "pointer", transition: "all 0.15s ease" }}>
                        {isChecked && <svg width="9" height="7" viewBox="0 0 9 7" fill="none"><path d="M1 3.2L3.2 5.5L8 1" stroke={week.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                      </div>

                      {isEditing ? (
                        <div style={{ flex: 1, display: "flex", gap: 6, alignItems: "center" }}>
                          <input
                            autoFocus
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            onKeyDown={(e) => { if (e.key === "Enter") submitEdit(); if (e.key === "Escape") setEditingId(null); }}
                            style={{ flex: 1, fontSize: 13, fontFamily: "system-ui", border: `1px solid ${week.color}50`, borderRadius: 5, padding: "4px 8px", outline: "none", color: "#2A2520", background: "#FFF" }}
                          />
                          <button onClick={submitEdit} style={{ padding: "4px 10px", background: week.color, border: "none", borderRadius: 5, color: "#FFF", fontSize: 11, fontFamily: "system-ui", fontWeight: 600, cursor: "pointer" }}>Save</button>
                          <button onClick={() => setEditingId(null)} style={{ padding: "4px 8px", background: "none", border: "1px solid #E0D8CC", borderRadius: 5, color: "#AAA", fontSize: 11, fontFamily: "system-ui", cursor: "pointer" }}>Cancel</button>
                        </div>
                      ) : (
                        <>
                          <span style={{ flex: 1, fontSize: 13, fontFamily: "system-ui", color: isChecked ? "#AAA" : "#2A2520", lineHeight: 1.55, textDecoration: isChecked ? "line-through" : "none", textDecorationColor: "#C8C0B0" }}>{task.text}</span>
                          <div style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
                            <button onClick={() => startEdit(task)} style={{ background: "none", border: "none", cursor: "pointer", color: "#D0C8BC", fontSize: 12, padding: "0 3px", transition: "color 0.15s ease" }} onMouseEnter={e => e.currentTarget.style.color = week.color} onMouseLeave={e => e.currentTarget.style.color = "#D0C8BC"} title="Edit">✎</button>
                            <button onClick={() => onDeleteTask(task.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "#D0C8BC", fontSize: 15, padding: "0 3px", lineHeight: 1, transition: "color 0.15s ease" }} onMouseEnter={e => e.currentTarget.style.color = "#D13B2A"} onMouseLeave={e => e.currentTarget.style.color = "#D0C8BC"} title="Remove">×</button>
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}

                {/* Add task row */}
                {addingWeek === week.id ? (
                  <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 10, paddingTop: 10, borderTop: `1px dashed ${week.color}30` }}>
                    <div style={{ width: 16, height: 16, flexShrink: 0, border: `1.5px dashed ${week.color}50`, borderRadius: 4 }} />
                    <input
                      autoFocus
                      value={newTaskText}
                      onChange={(e) => setNewTaskText(e.target.value)}
                      onKeyDown={(e) => { if (e.key === "Enter") submitAdd(week.id); if (e.key === "Escape") { setAddingWeek(null); setNewTaskText(""); } }}
                      placeholder="New task... (Enter to add, Esc to cancel)"
                      style={{ flex: 1, fontSize: 13, fontFamily: "system-ui", border: `1px solid ${week.color}50`, borderRadius: 5, padding: "4px 8px", outline: "none", color: "#2A2520", background: "#FFF" }}
                    />
                    <button onClick={() => submitAdd(week.id)} style={{ padding: "4px 10px", background: week.color, border: "none", borderRadius: 5, color: "#FFF", fontSize: 11, fontFamily: "system-ui", fontWeight: 600, cursor: "pointer" }}>Add</button>
                    <button onClick={() => { setAddingWeek(null); setNewTaskText(""); }} style={{ padding: "4px 8px", background: "none", border: "1px solid #E0D8CC", borderRadius: 5, color: "#AAA", fontSize: 11, fontFamily: "system-ui", cursor: "pointer" }}>Cancel</button>
                  </div>
                ) : (
                  <button onClick={() => setAddingWeek(week.id)} style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 10, padding: "6px 10px", background: "transparent", border: `1px dashed ${week.color}40`, borderRadius: 6, cursor: "pointer", color: week.color, fontFamily: "system-ui", fontSize: 12 }}>
                    <span style={{ fontSize: 14, lineHeight: 1 }}>+</span> Add task
                  </button>
                )}
              </div>
            )}
          </div>
        )})}
      </div>
      <div style={{ marginTop: 20, padding: "12px 16px", background: "#FEF0EE", border: "1px solid #D13B2A20", borderLeft: "3px solid #D13B2A", borderRadius: 8, fontSize: 12, fontFamily: "system-ui", color: "#6A1A1A", lineHeight: 1.6 }}>
        <strong>Non-negotiable this summer:</strong> (1) secure lab position or research volunteer role, (2) email NYU Fellowships Office, (3) draft a version of your personal statement. Everything else is a bonus.
      </div>
    </div>
  );
}

// ── CHECKLIST ITEM ────────────────────────────────────────────────────────────

function ChecklistItem({ item, checked, onToggle, onDelete, onDeleteSubtask, onAddSubtask, onSetDueDate, dueDates, catColor, catAccent, note, onNoteChange }) {
  const [openPanel, setOpenPanel] = useState(null); // null | "subtasks" | "notes"
  const [editingDueDate, setEditingDueDate] = useState(null);
  const [newSubText, setNewSubText] = useState("");
  const [showAddSub, setShowAddSub] = useState(false);
  const isChecked = !!checked[item.id];
  const pCfg = priorityConfig[item.priority];
  const visibleSubtasks = (item.subtasks || []).filter((s) => !s._removed);
  const hasSubtasks = visibleSubtasks.length > 0;
  const subtasksDone = visibleSubtasks.filter((s) => !!checked[s.id]).length;
  const hasNote = note && note.trim().length > 0;

  const togglePanel = (panel) => setOpenPanel((prev) => prev === panel ? null : panel);

  const submitSubtask = () => {
    if (!newSubText.trim()) return;
    onAddSubtask(item.id, newSubText.trim());
    setNewSubText("");
    setShowAddSub(false);
    setOpenPanel("subtasks");
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return null;
    const d = new Date(dateStr + "T00:00:00");
    const now = new Date(); now.setHours(0,0,0,0);
    const diff = Math.ceil((d - now) / 86400000);
    const label = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    if (diff < 0) return { label, color: "#D13B2A", bg: "#FEF0EE", note: "overdue" };
    if (diff === 0) return { label: "Today", color: "#B07D2A", bg: "#FDF5E6", note: "" };
    if (diff <= 7) return { label, color: "#B07D2A", bg: "#FDF5E6", note: `${diff}d` };
    return { label, color: "#2A6B8A", bg: "#E8F4F8", note: `${diff}d` };
  };

  const isOpen = openPanel !== null;

  return (
    <div style={{ background: isChecked ? "#F5F3EF" : "#FFFFFF", border: `1px solid ${isChecked ? "#DDD8CC" : isOpen ? catColor + "35" : "#E8E4DA"}`, borderRadius: 8, overflow: "hidden", transition: "all 0.2s ease", boxShadow: isChecked ? "none" : "0 1px 3px rgba(0,0,0,0.04)", opacity: isChecked ? 0.7 : 1 }}>

      {/* Main row */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "12px 14px", cursor: "pointer" }} onClick={() => onToggle(item.id)}>
        <div style={{ width: 18, height: 18, flexShrink: 0, border: `1.5px solid ${isChecked ? catColor : "#D0C8BC"}`, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", background: isChecked ? catAccent : "#FAFAF8", marginTop: 1, transition: "all 0.2s ease" }}>
          {isChecked && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 3.5L3.5 6.5L9 1" stroke={catColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
        </div>
        <p style={{ margin: 0, flex: 1, fontSize: 13, lineHeight: 1.6, color: isChecked ? "#AAA" : "#2A2520", textDecoration: isChecked ? "line-through" : "none", fontFamily: "system-ui", textDecorationColor: "#C8C0B0", textAlign: "left" }}>
          {item.text}
          {hasSubtasks && openPanel !== "subtasks" && <span style={{ fontSize: 11, color: "#BBB", marginLeft: 8, fontStyle: "italic" }}>({subtasksDone}/{visibleSubtasks.length})</span>}
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 5, flexShrink: 0 }} onClick={(e) => e.stopPropagation()}>
          <div style={{ background: pCfg.bg, borderRadius: 10, padding: "2px 7px", display: "flex", alignItems: "center", gap: 4 }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: pCfg.dot }} />
            <span style={{ fontSize: 10, color: pCfg.dot, fontFamily: "system-ui", fontWeight: 500 }}>{pCfg.label}</span>
          </div>

          {/* Notes toggle */}
          <button onClick={() => togglePanel("notes")} style={{ background: openPanel === "notes" ? catAccent : "none", border: openPanel === "notes" ? `1px solid ${catColor}30` : "none", borderRadius: 5, cursor: "pointer", fontSize: 13, padding: "1px 5px", lineHeight: 1, color: hasNote || openPanel === "notes" ? catColor : "#D0C8BC", transition: "all 0.15s ease" }} title="Notes">✎</button>

          {/* Add subtask toggle */}
          <button onClick={() => { setShowAddSub(!showAddSub); if (!showAddSub) setOpenPanel("subtasks"); }} style={{ background: showAddSub ? catAccent : "none", border: showAddSub ? `1px solid ${catColor}30` : "none", borderRadius: 5, cursor: "pointer", fontSize: 14, padding: "1px 5px", lineHeight: 1, color: showAddSub ? catColor : "#D0C8BC", transition: "all 0.15s ease" }} title="Add subtask">+</button>

          {/* Subtasks expand */}
          {(hasSubtasks || showAddSub) && (
            <button onClick={() => togglePanel("subtasks")} style={{ background: "none", border: "none", cursor: "pointer", color: catColor, fontSize: 12, padding: "0 3px", lineHeight: 1, opacity: 0.7, transition: "transform 0.2s" }} title={openPanel === "subtasks" ? "Hide subtasks" : "Show subtasks"}>
              {openPanel === "subtasks" ? "▲" : "▼"}
            </button>
          )}

          <button onClick={() => onDelete()} style={{ background: "none", border: "none", cursor: "pointer", color: "#D0C8BC", fontSize: 16, padding: "0 2px", lineHeight: 1, transition: "color 0.15s ease" }} onMouseEnter={e => e.currentTarget.style.color="#D13B2A"} onMouseLeave={e => e.currentTarget.style.color="#D0C8BC"} title="Remove task">×</button>
        </div>
      </div>

      {/* ── NOTES DROPDOWN ── */}
      {openPanel === "notes" && (
        <div style={{ borderTop: `1px solid ${catColor}18`, padding: "12px 14px", background: catAccent + "44" }} onClick={(e) => e.stopPropagation()}>
          <div style={{ fontSize: 10, fontFamily: "system-ui", color: catColor, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 7, fontWeight: 600 }}>Notes</div>
          <textarea
            value={note || ""}
            onChange={(e) => onNoteChange(item.id, e.target.value)}
            placeholder="Add notes, links, ideas, or reminders for this task..."
            rows={3}
            style={{ width: "100%", padding: "8px 10px", border: `1px solid ${catColor}28`, borderRadius: 6, fontSize: 12, fontFamily: "system-ui", color: "#2A2520", resize: "vertical", outline: "none", background: "#FFFFFF", boxSizing: "border-box", lineHeight: 1.6 }}
          />
        </div>
      )}

      {/* ── SUBTASKS DROPDOWN ── */}
      {openPanel === "subtasks" && (
        <div style={{ borderTop: `1px solid ${catColor}18`, background: catAccent + "55", padding: "10px 14px 12px 38px" }} onClick={(e) => e.stopPropagation()}>

          {visibleSubtasks.map((sub) => {
            const subChecked = !!checked[sub.id];
            const due = formatDate(dueDates[sub.id]);
            const isEditingThis = editingDueDate === sub.id;
            return (
              <div key={sub.id} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <div onClick={() => onToggle(sub.id)} style={{ width: 15, height: 15, flexShrink: 0, border: `1.5px solid ${subChecked ? catColor : "#D0C8BC"}`, borderRadius: 3, display: "flex", alignItems: "center", justifyContent: "center", background: subChecked ? catAccent : "#FFF", transition: "all 0.15s ease", cursor: "pointer" }}>
                  {subChecked && <svg width="8" height="6" viewBox="0 0 8 6" fill="none"><path d="M1 2.5L3 5L7 1" stroke={catColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                </div>
                <span style={{ flex: 1, fontSize: 12, fontFamily: "system-ui", color: subChecked ? "#AAA" : "#3A3228", lineHeight: 1.5, textDecoration: subChecked ? "line-through" : "none", textDecorationColor: "#C8C0B0", textAlign: "left" }}>{sub.text}</span>
                <div style={{ display: "flex", alignItems: "center", gap: 5, flexShrink: 0 }}>
                  {due && !isEditingThis && (
                    <span onClick={() => setEditingDueDate(sub.id)} style={{ fontSize: 10, fontFamily: "system-ui", background: due.bg, color: due.color, padding: "2px 8px", borderRadius: 8, fontWeight: 500, cursor: "pointer", whiteSpace: "nowrap" }}>📅 {due.label}{due.note ? ` · ${due.note}` : ""}</span>
                  )}
                  {isEditingThis && (
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <input type="date" defaultValue={dueDates[sub.id] || ""} autoFocus onChange={(e) => { onSetDueDate(sub.id, e.target.value); setEditingDueDate(null); }} onBlur={() => setEditingDueDate(null)} style={{ fontSize: 11, fontFamily: "system-ui", border: `1px solid ${catColor}60`, borderRadius: 5, padding: "2px 6px", outline: "none", color: "#3A3228", background: "#FFF" }} />
                      {dueDates[sub.id] && <button onClick={() => { onSetDueDate(sub.id, null); setEditingDueDate(null); }} style={{ fontSize: 10, fontFamily: "system-ui", background: "none", border: "none", color: "#D13B2A", cursor: "pointer", padding: "0 2px" }}>remove</button>}
                    </div>
                  )}
                  {!due && !isEditingThis && (
                    <button onClick={() => setEditingDueDate(sub.id)} style={{ fontSize: 10, fontFamily: "system-ui", background: "none", border: "1px dashed #D0C8BC", borderRadius: 8, color: "#BBB", cursor: "pointer", padding: "2px 7px", transition: "all 0.15s", whiteSpace: "nowrap" }} onMouseEnter={e => { e.currentTarget.style.borderColor = catColor; e.currentTarget.style.color = catColor; }} onMouseLeave={e => { e.currentTarget.style.borderColor = "#D0C8BC"; e.currentTarget.style.color = "#BBB"; }}>+ date</button>
                  )}
                  <button onClick={() => onDeleteSubtask(sub.id, sub.text)} style={{ background: "none", border: "none", cursor: "pointer", color: "#D0C8BC", fontSize: 15, padding: "0 2px", lineHeight: 1, transition: "color 0.15s ease" }} onMouseEnter={e => e.currentTarget.style.color="#D13B2A"} onMouseLeave={e => e.currentTarget.style.color="#D0C8BC"} title="Remove">×</button>
                </div>
              </div>
            );
          })}

          {/* Add subtask inline form */}
          {showAddSub && (
            <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: visibleSubtasks.length > 0 ? 8 : 0, paddingTop: visibleSubtasks.length > 0 ? 8 : 0, borderTop: visibleSubtasks.length > 0 ? `1px dashed ${catColor}25` : "none" }}>
              <div style={{ width: 15, height: 15, flexShrink: 0, border: `1.5px dashed ${catColor}50`, borderRadius: 3, background: "transparent" }} />
              <input
                autoFocus
                value={newSubText}
                onChange={(e) => setNewSubText(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") submitSubtask(); if (e.key === "Escape") { setShowAddSub(false); setNewSubText(""); } }}
                placeholder="New subtask... (Enter to add, Esc to cancel)"
                style={{ flex: 1, fontSize: 12, fontFamily: "system-ui", border: `1px solid ${catColor}40`, borderRadius: 5, padding: "4px 8px", outline: "none", color: "#2A2520", background: "#FFF" }}
              />
              <button onClick={submitSubtask} style={{ padding: "4px 10px", background: catColor, border: "none", borderRadius: 5, color: "#FFF", fontSize: 11, fontFamily: "system-ui", fontWeight: 600, cursor: "pointer", flexShrink: 0 }}>Add</button>
              <button onClick={() => { setShowAddSub(false); setNewSubText(""); }} style={{ padding: "4px 8px", background: "none", border: `1px solid #E0D8CC`, borderRadius: 5, color: "#AAA", fontSize: 11, fontFamily: "system-ui", cursor: "pointer", flexShrink: 0 }}>Cancel</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────

export default function RhodesChecklist() {
  const [checked, setChecked] = useState({});
  const [activeCategory, setActiveCategory] = useState("academic");
  const [tab, setTab] = useState("checklist");
  const [checklistTab, setChecklistTab] = useState("core");
  const [customItems, setCustomItems] = useState({});
  const [removedItems, setRemovedItems] = useState(new Set());
  const [removedSubtasks, setRemovedSubtasks] = useState(new Set());
  const [dueDates, setDueDates] = useState({});
  const [notes, setNotes] = useState({});
  const [undoStack, setUndoStack] = useState([]);
  const [undoToast, setUndoToast] = useState(null);
  const [newItemText, setNewItemText] = useState("");
  const [newItemPriority, setNewItemPriority] = useState("high");
  const [showAddForm, setShowAddForm] = useState(false);
  const [summerPlanState, setSummerPlanState] = useState(summerPlan);

  const editSummerTask = (taskId, newText) => {
    setSummerPlanState((prev) => prev.map((week) => ({
      ...week,
      tasks: week.tasks.map((t) => t.id === taskId ? { ...t, text: newText } : t),
    })));
  };

  const deleteSummerTask = (taskId) => {
    let removedText = "";
    setSummerPlanState((prev) => prev.map((week) => {
      const found = week.tasks.find((t) => t.id === taskId);
      if (found) removedText = found.text;
      return { ...week, tasks: week.tasks.filter((t) => t.id !== taskId) };
    }));
    setChecked((prev) => { const next = { ...prev }; delete next[taskId]; return next; });
    pushUndo({ label: `Removed "${removedText.slice(0, 30)}"`, revert: () => {
      setSummerPlanState((prev) => prev.map((week) => {
        const orig = summerPlan.find((w) => w.id === week.id);
        const origTask = orig?.tasks.find((t) => t.id === taskId);
        if (origTask && !week.tasks.find((t) => t.id === taskId)) {
          const idx = orig.tasks.findIndex((t) => t.id === taskId);
          const newTasks = [...week.tasks];
          newTasks.splice(Math.min(idx, newTasks.length), 0, origTask);
          return { ...week, tasks: newTasks };
        }
        return week;
      }));
    }});
  };

  const addSummerTask = (weekId, text) => {
    const taskId = `custom_${weekId}_${Date.now()}`;
    setSummerPlanState((prev) => prev.map((week) => week.id === weekId ? { ...week, tasks: [...week.tasks, { id: taskId, text }] } : week));
    pushUndo({ label: `Added "${text.slice(0, 30)}"`, revert: () => {
      setSummerPlanState((prev) => prev.map((week) => week.id === weekId ? { ...week, tasks: week.tasks.filter((t) => t.id !== taskId) } : week));
    }});
  };

  const pushUndo = (action) => {
    setUndoStack((prev) => [...prev.slice(-19), action]);
    setUndoToast(action.label);
    clearTimeout(window._undoToastTimer);
    window._undoToastTimer = setTimeout(() => setUndoToast(null), 4000);
  };

  const undo = () => {
    setUndoStack((prev) => {
      if (!prev.length) return prev;
      const last = prev[prev.length - 1];
      last.revert();
      setUndoToast(null);
      return prev.slice(0, -1);
    });
  };

  const toggle = (id) => setChecked((prev) => ({ ...prev, [id]: !prev[id] }));

  const addItem = () => {
    if (!newItemText.trim()) return;
    const id = `custom_${activeCategory}_${Date.now()}`;
    const newEntry = { id, text: newItemText.trim(), priority: newItemPriority, subtasks: [] };
    setCustomItems((prev) => ({ ...prev, [activeCategory]: [...(prev[activeCategory] || []), newEntry] }));
    pushUndo({ label: `Added "${newEntry.text.slice(0, 30)}"`, revert: () => setCustomItems((prev) => ({ ...prev, [activeCategory]: (prev[activeCategory] || []).filter((i) => i.id !== id) })) });
    setNewItemText(""); setShowAddForm(false);
  };

  const deleteItem = (catId, itemId, itemText) => {
    const isCustom = itemId.startsWith("custom_");
    if (isCustom) {
      const snapshot = customItems[catId] || [];
      setCustomItems((prev) => ({ ...prev, [catId]: (prev[catId] || []).filter((i) => i.id !== itemId) }));
      pushUndo({ label: `Removed "${(itemText||"").slice(0,30)}"`, revert: () => setCustomItems((prev) => ({ ...prev, [catId]: snapshot })) });
    } else {
      setRemovedItems((prev) => new Set([...prev, itemId]));
      pushUndo({ label: `Removed "${(itemText||"").slice(0,30)}"`, revert: () => setRemovedItems((prev) => { const n = new Set(prev); n.delete(itemId); return n; }) });
    }
    setChecked((prev) => { const next = { ...prev }; delete next[itemId]; return next; });
  };

  const deleteSubtask = (subId, subText) => {
    setRemovedSubtasks((prev) => new Set([...prev, subId]));
    setChecked((prev) => { const next = { ...prev }; delete next[subId]; return next; });
    pushUndo({ label: `Removed subtask "${(subText||"").slice(0,30)}"`, revert: () => setRemovedSubtasks((prev) => { const n = new Set(prev); n.delete(subId); return n; }) });
  };

  const setDueDate = (subId, date) => {
    setDueDates((prev) => { const next = { ...prev }; if (date) next[subId] = date; else delete next[subId]; return next; });
  };

  const setNote = (itemId, value) => {
    setNotes((prev) => ({ ...prev, [itemId]: value }));
  };

  const addSubtask = (itemId, text) => {
    const subId = `sub_${itemId}_${Date.now()}`;
    const newSub = { id: subId, text };
    setCustomItems((prev) => {
      // check if item is a custom item
      for (const [catId, items] of Object.entries(prev)) {
        const idx = items.findIndex((i) => i.id === itemId);
        if (idx !== -1) {
          const updated = items.map((i) => i.id === itemId ? { ...i, subtasks: [...(i.subtasks || []), newSub] } : i);
          return { ...prev, [catId]: updated };
        }
      }
      return prev;
    });
    // for built-in items, store extra subtasks separately
    setNotes((prev) => ({ ...prev, [`__subs__${itemId}`]: JSON.stringify([...(JSON.parse(prev[`__subs__${itemId}`] || "[]")), newSub]) }));
    pushUndo({ label: `Added subtask "${text.slice(0, 30)}"`, revert: () => { setRemovedSubtasks((prev) => new Set([...prev, subId])); } });
  };

  const getItems = (cat) => [
    ...cat.items
      .filter((i) => !removedItems.has(i.id))
      .map((i) => {
        const extraSubs = JSON.parse(notes[`__subs__${i.id}`] || "[]");
        return {
          ...i,
          subtasks: [
            ...(i.subtasks || []).filter((s) => !removedSubtasks.has(s.id)),
            ...extraSubs.filter((s) => !removedSubtasks.has(s.id)),
          ],
        };
      }),
    ...(customItems[cat.id] || []).map((i) => ({
      ...i,
      subtasks: (i.subtasks || []).filter((s) => !removedSubtasks.has(s.id)),
    })),
  ];

  const allItems = categories.flatMap((c) => {
    const items = getItems(c);
    return [...items, ...items.flatMap((i) => i.subtasks || [])];
  });
  const totalItems = allItems.length;
  const totalChecked = allItems.filter((i) => !!checked[i.id]).length;
  const progress = Math.round((totalChecked / totalItems) * 100);

  const activeData = categories.find((c) => c.id === activeCategory);
  const categoryChecked = (cat) => {
    const items = getItems(cat);
    const subs = items.flatMap((i) => i.subtasks || []);
    return [...items, ...subs].filter((i) => !!checked[i.id]).length;
  };
  const categoryTotal = (cat) => {
    const items = getItems(cat);
    return items.length + items.flatMap((i) => i.subtasks || []).length;
  };

  const visibleCategories = checklistTab === "core"
    ? categories.filter((c) => schoolGroups.core.includes(c.id))
    : categories.filter((c) => schoolGroups.schools.includes(c.id));

  const mainTabBtn = (id, label) => ({
    padding: "9px 22px",
    background: tab === id ? "#FFFFFF" : "transparent",
    border: tab === id ? "1px solid #D8D0C0" : "1px solid transparent",
    borderRadius: 6, color: tab === id ? "#5A3E10" : "#999",
    fontSize: 12, fontFamily: "system-ui", letterSpacing: "0.04em",
    cursor: "pointer", fontWeight: tab === id ? 600 : 400,
    boxShadow: tab === id ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
    transition: "all 0.2s ease",
  });

  return (
    <div style={{ minHeight: "100vh", background: "#FFFFFF", fontFamily: "'Georgia','Times New Roman',serif", color: "#1A1A1A" }}>
      <div style={{ maxWidth: 980, margin: "0 auto", padding: "48px 24px" }}>

        {/* Header */}
        <div style={{ marginBottom: 36, borderBottom: "1px solid #E8E4DA", paddingBottom: 28, textAlign: "center" }}>
          <div style={{ fontSize: 11, letterSpacing: "0.3em", color: "#8A6A30", textTransform: "uppercase", marginBottom: 10 }}>
            Oxford · Cambridge · Harvard · Stanford · Yale · Princeton
          </div>
          <h1 style={{ fontSize: "clamp(24px, 4vw, 42px)", fontWeight: 400, margin: "0 0 6px 0", lineHeight: 1.1, letterSpacing: "-0.02em", color: "#1A1208", fontFamily: "'Georgia', 'Times New Roman', serif" }}>
            Claudia's Graduate Admissions
            <br /><span style={{ color: "#8A6A30", fontStyle: "italic" }}>Candidate Checklist</span>
          </h1>
          <p style={{ color: "#AAA", fontSize: 13, margin: "12px 0 24px 0", fontFamily: "system-ui" }}>
            Psychology · NYU CAS · Class of 2028 · GPA 3.843 → target 3.93+
          </p>

          {/* Progress bar — centered below title */}
          <div style={{ maxWidth: 480, margin: "0 auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
              <span style={{ fontSize: 11, color: "#BBB", fontFamily: "system-ui", letterSpacing: "0.1em", textTransform: "uppercase" }}>Overall Progress</span>
              <span style={{ fontSize: 20, color: "#8A6A30", fontFamily: "system-ui", fontWeight: 300 }}>
                {totalChecked}<span style={{ fontSize: 13, color: "#CCC" }}>/{totalItems}</span>
              </span>
            </div>
            <div style={{ height: 4, background: "#EDE9E0", borderRadius: 4, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${progress}%`, background: "linear-gradient(90deg,#8A6A30,#C8A050)", borderRadius: 4, transition: "width 0.6s cubic-bezier(0.4,0,0.2,1)" }} />
            </div>
            <div style={{ fontSize: 11, color: "#CCC", marginTop: 5, fontFamily: "system-ui", textAlign: "right" }}>{progress}% complete</div>
          </div>
        </div>

        {/* Main tab switcher */}
        <div style={{ display: "flex", gap: 4, marginBottom: 36, background: "#F0EDE6", borderRadius: 8, padding: 4, width: "fit-content", margin: "0 auto 36px auto" }}>
          {[["checklist","✓  Checklist"],["timeline","◎  Timeline"],["summer","☀  Summer Plan"],["readiness","◈  Readiness"]].map(([id, label]) => (
            <button key={id} style={mainTabBtn(id, label)} onClick={() => setTab(id)}>{label}</button>
          ))}
        </div>

        {/* ── TIMELINE ── */}
        {tab === "timeline" && (
          <div style={{ background: "#FAFAF8", borderRadius: 12, padding: "32px 36px", border: "1px solid #E8E4DA" }}>
            <h2 style={{ margin: "0 0 4px 0", fontSize: 20, fontWeight: 400, color: "#1A1208", letterSpacing: "-0.01em" }}>Your Road to Applications</h2>
            <p style={{ margin: "0 0 28px 0", fontSize: 13, color: "#AAA", fontFamily: "system-ui" }}>Junior Year Summer 2026 → December 2027 deadlines</p>
            <TimelinePanel />
          </div>
        )}

        {/* ── SUMMER PLAN ── */}
        {tab === "summer" && (
          <div style={{ background: "#FAFAF8", borderRadius: 12, padding: "32px 36px", border: "1px solid #E8E4DA" }}>
            <h2 style={{ margin: "0 0 4px 0", fontSize: 20, fontWeight: 400, color: "#1A1208" }}>Summer 2026 Action Plan</h2>
            <p style={{ margin: "0 0 8px 0", fontSize: 13, color: "#AAA", fontFamily: "system-ui" }}>June 7 – August 27, 2026 · 12 weeks before NYU London</p>
            <SummerPanel
              checked={checked}
              onToggle={toggle}
              summerData={summerPlanState}
              onEditTask={editSummerTask}
              onDeleteTask={deleteSummerTask}
              onAddTask={addSummerTask}
            />
          </div>
        )}

        {/* ── READINESS ── */}
        {tab === "readiness" && (
          <div style={{ background: "#FAFAF8", borderRadius: 12, padding: "32px 36px", border: "1px solid #E8E4DA" }}>
            <h2 style={{ margin: "0 0 4px 0", fontSize: 20, fontWeight: 400, color: "#1A1208" }}>2027 Deadline Readiness Assessment</h2>
            <p style={{ margin: "0 0 24px 0", fontSize: 13, color: "#AAA", fontFamily: "system-ui" }}>Based on typical successful applicant profiles — honest analysis of where you stand</p>
            <ReadinessPanel />
          </div>
        )}

        {/* ── CHECKLIST ── */}
        {tab === "checklist" && (
          <>
            <div style={{ display: "flex", gap: 4, marginBottom: 28, background: "#F0EDE6", borderRadius: 8, padding: 4, width: "fit-content" }}>
              {[{ id: "core", label: "Core Foundations" }, { id: "schools", label: "By School" }].map((t) => (
                <button key={t.id} onClick={() => { setChecklistTab(t.id); setActiveCategory(t.id === "core" ? "academic" : "oxford"); setShowAddForm(false); }} style={{ padding: "7px 18px", background: checklistTab === t.id ? "#FFFFFF" : "transparent", border: checklistTab === t.id ? "1px solid #D8D0C0" : "1px solid transparent", borderRadius: 6, color: checklistTab === t.id ? "#5A3E10" : "#AAA", fontSize: 12, fontFamily: "system-ui", cursor: "pointer", fontWeight: checklistTab === t.id ? 500 : 400, boxShadow: checklistTab === t.id ? "0 1px 3px rgba(0,0,0,0.08)" : "none", transition: "all 0.2s ease" }}>{t.label}</button>
              ))}
            </div>

            <div style={{ display: "flex", gap: 28, alignItems: "flex-start" }}>
              {/* Sidebar */}
              <div style={{ width: 200, flexShrink: 0 }}>
                <div style={{ fontSize: 10, letterSpacing: "0.25em", color: "#CCC", textTransform: "uppercase", marginBottom: 12, fontFamily: "system-ui" }}>{checklistTab === "core" ? "Categories" : "Schools"}</div>
                {visibleCategories.map((cat) => {
                  const done = categoryChecked(cat);
                  const total = categoryTotal(cat);
                  const isActive = cat.id === activeCategory;
                  return (
                    <button key={cat.id} onClick={() => { setActiveCategory(cat.id); setShowAddForm(false); }} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", padding: "9px 11px", marginBottom: 3, background: isActive ? "#FAFAF8" : "transparent", border: isActive ? `1px solid ${cat.color}22` : "1px solid transparent", borderLeft: isActive ? `2px solid ${cat.color}` : "2px solid transparent", borderRadius: 6, cursor: "pointer", textAlign: "left", transition: "all 0.2s ease", boxShadow: isActive ? "0 1px 4px rgba(0,0,0,0.06)" : "none" }}>
                      <span style={{ fontSize: 12, color: isActive ? cat.color : "#999", fontFamily: "system-ui", fontWeight: isActive ? 600 : 400 }}>{cat.label}</span>
                      <span style={{ fontSize: 10, color: done === total ? cat.color : "#CCC", fontFamily: "system-ui", background: isActive ? cat.accent : "#EDE9E0", padding: "2px 6px", borderRadius: 10, fontWeight: done === total ? 600 : 400 }}>{done}/{total}</span>
                    </button>
                  );
                })}
                <div style={{ marginTop: 24, paddingTop: 18, borderTop: "1px solid #EDE9E0" }}>
                  <div style={{ fontSize: 10, letterSpacing: "0.2em", color: "#CCC", textTransform: "uppercase", marginBottom: 10, fontFamily: "system-ui" }}>Priority</div>
                  {Object.entries(priorityConfig).map(([key, cfg]) => (
                    <div key={key} style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 7 }}>
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: cfg.dot, flexShrink: 0 }} />
                      <span style={{ fontSize: 11, color: "#AAA", fontFamily: "system-ui" }}>{cfg.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Main checklist area */}
              <div style={{ flex: 1, minWidth: 0 }}>
                {activeData && (
                  <>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, paddingBottom: 12, borderBottom: `2px solid ${activeData.accent}` }}>
                      <span style={{ fontSize: 17, color: activeData.color }}>{activeData.icon}</span>
                      <h2 style={{ margin: 0, fontSize: 18, fontWeight: 400, color: activeData.color, letterSpacing: "-0.01em" }}>{activeData.label}</h2>
                      <span style={{ fontSize: 11, color: "#CCC", fontFamily: "system-ui", marginLeft: "auto" }}>{categoryChecked(activeData)} of {categoryTotal(activeData)} done</span>
                    </div>

                    {activeData.school && (
                      <div style={{ marginBottom: 14, padding: "10px 14px", background: activeData.accent, border: `1px solid ${activeData.color}22`, borderLeft: `3px solid ${activeData.color}`, borderRadius: 6, fontSize: 12, color: activeData.color, fontFamily: "system-ui", lineHeight: 1.65 }}>
                        {activeData.id === "oxford" && "Via Rhodes Scholarship — requires NYU institutional endorsement. 32 US scholars selected annually."}
                        {activeData.id === "cambridge" && "Gates Cambridge covers full costs. Research proposal and supervisor match are critical. Visit in person during London semester."}
                        {activeData.id === "harvard" && "~2–5% acceptance rate. Faculty fit is the primary criterion. Prof. Uri Hasson at Princeton studies narrative — crossover interest."}
                        {activeData.id === "stanford" && "Applied impact framing essential. SPARQ lab is a strong fit. Jamil Zaki's empathy lab aligns directly with your interests."}
                        {activeData.id === "yale" && "Strong in clinical science and social cognition. Prof. Woo-kyoung Ahn studies how people understand mental illness — exceptional fit."}
                        {activeData.id === "princeton" && "No standalone Psych PhD — route through PNI. Prof. Uri Hasson studies neural coupling during communication and story comprehension — strong fit with your interest in how art transmits psychological states between people."}
                      </div>
                    )}

                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      {getItems(activeData).map((item) => (
                        <ChecklistItem
                          key={item.id}
                          item={item}
                          checked={checked}
                          onToggle={toggle}
                          onDelete={() => deleteItem(activeData.id, item.id, item.text)}
                          onDeleteSubtask={(subId, subText) => deleteSubtask(subId, subText)}
                          onAddSubtask={addSubtask}
                          onSetDueDate={setDueDate}
                          dueDates={dueDates}
                          note={notes[item.id]}
                          onNoteChange={setNote}
                          catColor={activeData.color}
                          catAccent={activeData.accent}
                        />
                      ))}
                    </div>

                    {/* Add item */}
                    <div style={{ marginTop: 14 }}>
                      {!showAddForm ? (
                        <button onClick={() => setShowAddForm(true)} style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 16px", background: "transparent", border: `1.5px dashed ${activeData.color}40`, borderRadius: 7, cursor: "pointer", color: activeData.color, fontFamily: "system-ui", fontSize: 13, width: "100%", transition: "all 0.2s ease" }}>
                          <span style={{ fontSize: 18, lineHeight: 1 }}>+</span> Add item to {activeData.label}
                        </button>
                      ) : (
                        <div style={{ padding: "16px", background: "#FFFFFF", border: `1px solid ${activeData.color}30`, borderRadius: 8, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                          <textarea value={newItemText} onChange={(e) => setNewItemText(e.target.value)} placeholder="Describe your action item..." autoFocus rows={2}
                            style={{ width: "100%", padding: "10px 12px", border: "1px solid #E0D8CC", borderRadius: 6, fontSize: 13, fontFamily: "system-ui", color: "#2A2520", resize: "none", outline: "none", background: "#FAFAF8", boxSizing: "border-box" }} />
                          <div style={{ display: "flex", gap: 8, marginTop: 10, alignItems: "center" }}>
                            <select value={newItemPriority} onChange={(e) => setNewItemPriority(e.target.value)} style={{ padding: "7px 10px", border: "1px solid #E0D8CC", borderRadius: 6, fontSize: 12, fontFamily: "system-ui", color: "#5A4A30", background: "#FAFAF8", cursor: "pointer", outline: "none" }}>
                              <option value="critical">Critical</option>
                              <option value="high">High</option>
                              <option value="medium">Medium</option>
                            </select>
                            <button onClick={addItem} style={{ padding: "7px 18px", background: activeData.color, border: "none", borderRadius: 6, color: "#FFF", fontSize: 12, fontFamily: "system-ui", fontWeight: 600, cursor: "pointer" }}>Add</button>
                            <button onClick={() => { setShowAddForm(false); setNewItemText(""); }} style={{ padding: "7px 14px", background: "transparent", border: "1px solid #E0D8CC", borderRadius: 6, color: "#AAA", fontSize: 12, fontFamily: "system-ui", cursor: "pointer" }}>Cancel</button>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </>
        )}

        {/* Undo toast */}
        {undoToast && (
          <div style={{ position: "fixed", bottom: 28, left: "50%", transform: "translateX(-50%)", background: "#1A1A1A", color: "#FFF", borderRadius: 10, padding: "10px 18px", display: "flex", alignItems: "center", gap: 14, boxShadow: "0 4px 20px rgba(0,0,0,0.18)", zIndex: 9999, fontFamily: "system-ui", fontSize: 13, whiteSpace: "nowrap" }}>
            <span style={{ color: "#BBB" }}>{undoToast}</span>
            <button onClick={undo} style={{ background: "#C8A050", border: "none", borderRadius: 6, color: "#FFF", fontFamily: "system-ui", fontSize: 12, fontWeight: 600, cursor: "pointer", padding: "4px 12px", letterSpacing: "0.03em" }}>Undo</button>
          </div>
        )}

        {/* Footer */}
        <div style={{ marginTop: 56, paddingTop: 20, borderTop: "1px solid #EDE9E0", fontSize: 11, color: "#CCC", fontFamily: "system-ui", lineHeight: 1.9, textAlign: "center" }}>
          Rhodes Oct 2027 · Harvard/Yale/Princeton/Stanford Dec 2027 · Cambridge Jan 2028<br />
          <span style={{ color: "#8A6A30" }}>The scholars who win began building this profile two years before applying. You already have.</span>
        </div>
      </div>
    </div>
  );
}