/* ============================================ */
/* FILE: js/furigana.js (REVISED)                */
/* DESKRIPSI: Kuromoji + Furigana Engine         */
/* PERBAIKAN: Reading sekarang dalam HIRAGANA    */
/* SIMPAN DI: quiz-engine/js/ (timpa yang lama)  */
/* ============================================ */

// ========== CUSTOM DICTIONARY (Istilah Teknik - HIRAGANA) ==========
const CUSTOM_DICT = [
  // Keselamatan Kerja
  { surface: '電気器具', reading: 'でんききぐ', meaning: 'Peralatan listrik' },
  { surface: '漏電', reading: 'ろうでん', meaning: 'Kebocoran arus listrik' },
  { surface: '感電', reading: 'かんでん', meaning: 'Sengatan listrik' },
  { surface: '接地', reading: 'せっち', meaning: 'Grounding / Pembumian' },
  { surface: '危険予知', reading: 'きけんよち', meaning: 'Prediksi bahaya (KYT)' },
  { surface: '危険', reading: 'きけん', meaning: 'Bahaya' },
  { surface: '安全衛生', reading: 'あんぜんえいせい', meaning: 'Keselamatan & Kesehatan' },
  { surface: '労働安全衛生法', reading: 'ろうどうあんぜんえいせいほう', meaning: 'UU Keselamatan Kerja' },
  { surface: '労働災害', reading: 'ろうどうさいがい', meaning: 'Kecelakaan kerja' },
  { surface: '整理整頓', reading: 'せいりせいとん', meaning: 'Rapi & teratur (5S)' },
  { surface: '照度', reading: 'しょうど', meaning: 'Iluminasi (lux)' },
  { surface: '避難', reading: 'ひなん', meaning: 'Evakuasi' },
  { surface: '火気厳禁', reading: 'かきげんきん', meaning: 'Dilarang api' },
  { surface: '保護具', reading: 'ほごぐ', meaning: 'APD' },
  { surface: '玉掛け', reading: 'たまがけ', meaning: 'Rigging / Slinging' },
  { surface: '遮光', reading: 'しゃこう', meaning: 'Pelindung cahaya' },
  { surface: '防塵', reading: 'ぼうじん', meaning: 'Anti debu' },

  // Quality Control
  { surface: '品質管理', reading: 'ひんしつかんり', meaning: 'Quality Control' },
  { surface: '不良品', reading: 'ふりょうひん', meaning: 'Produk cacat' },
  { surface: '不適合品', reading: 'ふてきごうひん', meaning: 'Produk non-conforming' },
  { surface: '検査', reading: 'けんさ', meaning: 'Inspeksi / Pemeriksaan' },
  { surface: '全数検査', reading: 'ぜんすうけんさ', meaning: 'Inspeksi 100%' },
  { surface: '抜取検査', reading: 'ぬきとりけんさ', meaning: 'Inspeksi sampling' },
  { surface: '非破壊検査', reading: 'ひはかいけんさ', meaning: 'NDT (Non-Destructive Test)' },
  { surface: '破壊検査', reading: 'はかいけんさ', meaning: 'Destructive test' },
  { surface: '超音波探傷試験', reading: 'ちょうおんぱたんしょうしけん', meaning: 'Ultrasonic test' },
  { surface: '外観検査', reading: 'がいかんけんさ', meaning: 'Inspeksi visual' },
  { surface: '特性要因図', reading: 'とくせいよういんず', meaning: 'Diagram fishbone' },
  { surface: '散布図', reading: 'さんぷず', meaning: 'Scatter diagram' },
  { surface: '管理図', reading: 'かんりず', meaning: 'Control chart' },
  { surface: 'ヒストグラム', reading: 'ひすとぐらむ', meaning: 'Histogram' },
  { surface: 'パレート図', reading: 'ぱれーとず', meaning: 'Diagram Pareto' },
  { surface: 'チェックシート', reading: 'ちぇっくしーと', meaning: 'Check sheet' },
  { surface: '層別', reading: 'そうべつ', meaning: 'Stratifikasi' },
  { surface: '累積比率', reading: 'るいせきひりつ', meaning: 'Persentase kumulatif' },

  // Pengukuran
  { surface: '測定', reading: 'そくてい', meaning: 'Pengukuran' },
  { surface: '測定器', reading: 'そくていき', meaning: 'Alat ukur' },
  { surface: '測定面', reading: 'そくていめん', meaning: 'Permukaan ukur' },
  { surface: '最小読取値', reading: 'さいしょうよみとりち', meaning: 'Nilai pembacaan terkecil' },
  { surface: '校正', reading: 'こうせい', meaning: 'Kalibrasi' },
  { surface: '零点', reading: 'れいてん', meaning: 'Titik nol' },
  { surface: '外径', reading: 'がいけい', meaning: 'Diameter luar' },
  { surface: '内径', reading: 'ないけい', meaning: 'Diameter dalam' },
  { surface: '膜厚', reading: 'まくあつ', meaning: 'Ketebalan lapisan' },
  { surface: '膜厚計', reading: 'まくあつけい', meaning: 'Thickness gauge' },
  { surface: '平行度', reading: 'へいこうど', meaning: 'Parallelism' },

  // Material & Proses
  { surface: '弾性', reading: 'だんせい', meaning: 'Elastisitas' },
  { surface: '破壊', reading: 'はかい', meaning: 'Destruksi / Pecah' },
  { surface: '引張試験', reading: 'ひっぱりしけん', meaning: 'Uji tarik' },
  { surface: '曲げ試験', reading: 'まげしけん', meaning: 'Uji tekuk' },
  { surface: '衝撃試験', reading: 'しょうげきしけん', meaning: 'Uji impak' },
  { surface: '曲げ加工', reading: 'まげかこう', meaning: 'Proses tekuk' },
  { surface: '溶接', reading: 'ようせつ', meaning: 'Pengelasan' },
  { surface: '塗装', reading: 'とそう', meaning: 'Pengecatan' },
  { surface: '塗膜', reading: 'とまく', meaning: 'Lapisan cat' },
  { surface: '鋼板', reading: 'こうはん', meaning: 'Plat baja' },
  { surface: '天然ゴム', reading: 'てんねんごむ', meaning: 'Karet alam' },
  { surface: '絶縁', reading: 'ぜつえん', meaning: 'Isolasi' },
  { surface: '導体', reading: 'どうたい', meaning: 'Konduktor' },
  { surface: '荷重', reading: 'かじゅう', meaning: 'Beban' },
  { surface: '破損', reading: 'はそん', meaning: 'Kerusakan' },
  { surface: '劣化', reading: 'れっか', meaning: 'Degradasi' },

  // Mesin & Alat
  { surface: 'フライス盤', reading: 'ふらいすばん', meaning: 'Mesin frais' },
  { surface: 'ボール盤', reading: 'ぼーるばん', meaning: 'Mesin bor' },
  { surface: 'フォークリフト', reading: 'ふぉーくりふと', meaning: 'Forklift' },
  { surface: 'クレーン', reading: 'くれーん', meaning: 'Crane' },
  { surface: 'プレス機械', reading: 'ぷれすきかい', meaning: 'Mesin press' },
  { surface: '割刃', reading: 'わりば', meaning: 'Riving knife' },
  { surface: '反発予防装置', reading: 'はんぱつよぼうそうち', meaning: 'Anti-kickback device' },
  { surface: '駆動部', reading: 'くどうぶ', meaning: 'Bagian penggerak' },
  { surface: 'アース', reading: 'あーす', meaning: 'Arde / Ground' },

  // Dokumen & Gambar
  { surface: '組立図', reading: 'くみたてず', meaning: 'Gambar assembly' },
  { surface: '展開図', reading: 'てんかいず', meaning: 'Jaring / Development' },
  { surface: '製図', reading: 'せいず', meaning: 'Menggambar teknik' },
  { surface: '第三角法', reading: 'だいさんかくほう', meaning: 'Proyeksi sudut ketiga' },
  { surface: '図面', reading: 'ずめん', meaning: 'Gambar teknik' },
  { surface: '寸法', reading: 'すんぽう', meaning: 'Dimensi' },
  { surface: '公差', reading: 'こうさ', meaning: 'Toleransi' },
  { surface: 'はめあい', reading: 'はめあい', meaning: 'Fit / Suaian' },
  { surface: '表面性状', reading: 'ひょうめんせいじょう', meaning: 'Kekasaran permukaan' },
  { surface: 'かくれ線', reading: 'かくれせん', meaning: 'Garis tersembunyi' },

  // Manajemen
  { surface: '予防保全', reading: 'よぼうほぜん', meaning: 'Preventive maintenance' },
  { surface: '日常点検', reading: 'にちじょうてんけん', meaning: 'Inspeksi harian' },
  { surface: '定期検査', reading: 'ていきけんさ', meaning: 'Inspeksi berkala' },
  { surface: '三現主義', reading: 'さんげんしゅぎ', meaning: '3-Gen Principle' },
  { surface: '現場', reading: 'げんば', meaning: 'Lokasi aktual (Genba)' },
  { surface: '現物', reading: 'げんぶつ', meaning: 'Barang aktual (Genbutsu)' },
  { surface: '現実', reading: 'げんじつ', meaning: 'Fakta aktual (Genjitsu)' },
  { surface: 'ＰＤＣＡ', reading: 'ぴーでぃーしーえー', meaning: 'Plan-Do-Check-Act' },
];

// ========== KATAKANA TO HIRAGANA CONVERTER ==========
function katakanaToHiragana(str) {
  return str.replace(/[\u30A1-\u30F6]/g, function(match) {
    return String.fromCharCode(match.charCodeAt(0) - 0x60);
  });
}

// ========== FURIGANA ENGINE ==========
const FuriganaEngine = {
  tokenizer: null,
  isReady: false,
  mode: 'ruby', // 'ruby' | 'tooltip' | 'none'
  
  // ===== INIT =====
  async init() {
    return new Promise((resolve, reject) => {
      if (this.isReady) {
        resolve(true);
        return;
      }
      
      kuromoji.builder({ dicPath: 'https://cdn.jsdelivr.net/npm/kuromoji@0.1.2/dict/' }).build((err, tokenizer) => {
        if (err) {
          console.error('❌ Kuromoji failed to load:', err);
          console.warn('⚠️ Falling back to basic furigana mode');
          this.isReady = false;
          resolve(false);
          return;
        }
        
        this.tokenizer = tokenizer;
        this.isReady = true;
        console.log('✅ Furigana Engine ready (Hiragana mode)');
        resolve(true);
      });
    });
  },
  
  // ===== SET MODE =====
  setMode(mode) {
    if (['ruby', 'tooltip', 'none'].includes(mode)) {
      this.mode = mode;
      if (typeof Storage !== 'undefined') {
        Storage.setSetting('furiganaMode', mode);
      }
    }
  },
  
  // ===== PROCESS TEXT =====
  process(container, mode = null) {
    const currentMode = mode || this.mode;
    
    const elements = container.querySelectorAll('.japanese-text');
    
    elements.forEach(el => {
      const originalText = el.getAttribute('data-original') || el.textContent;
      el.setAttribute('data-original', originalText);
      
      switch (currentMode) {
        case 'ruby':
          el.innerHTML = this._renderRuby(originalText);
          el.classList.remove('tooltip-mode', 'none-mode');
          el.classList.add('ruby-mode');
          break;
        case 'tooltip':
          el.innerHTML = this._renderTooltip(originalText);
          el.classList.remove('ruby-mode', 'none-mode');
          el.classList.add('tooltip-mode');
          break;
        case 'none':
          el.innerHTML = originalText;
          el.classList.remove('ruby-mode', 'tooltip-mode');
          el.classList.add('none-mode');
          break;
      }
    });
  },
  
  // ===== RENDER RUBY MODE =====
  _renderRuby(text) {
    const tokens = this._tokenize(text);
    let html = '';
    
    tokens.forEach(token => {
      if (this._needsFurigana(token)) {
        // KONVERSI READING KE HIRAGANA
        const hiraganaReading = katakanaToHiragana(token.reading);
        html += `<ruby>${token.surface}<rt>${hiraganaReading}</rt></ruby>`;
      } else {
        html += token.surface;
      }
    });
    
    return html;
  },
  
  // ===== RENDER TOOLTIP MODE =====
  _renderTooltip(text) {
    const tokens = this._tokenize(text);
    let html = '';
    
    tokens.forEach(token => {
      if (this._needsFurigana(token)) {
        const hiraganaReading = katakanaToHiragana(token.reading);
        const meaning = token.meaning ? ` (${token.meaning})` : '';
        html += `<span class="furigana-tooltip" 
                      data-reading="${hiraganaReading}" 
                      data-meaning="${token.meaning || ''}"
                      onclick="FuriganaEngine._onWordTap(event, '${token.surface.replace(/'/g, "\\'")}', '${hiraganaReading.replace(/'/g, "\\'")}', '${(token.meaning || '').replace(/'/g, "\\'")}')"
                      title="${hiraganaReading}${meaning}">${token.surface}</span>`;
      } else {
        html += token.surface;
      }
    });
    
    return html;
  },
  
  // ===== TOKENIZE TEXT =====
  _tokenize(text) {
    if (this.tokenizer) {
      try {
        const rawTokens = this.tokenizer.tokenize(text);
        return rawTokens.map(t => ({
          surface: t.surface_form,
          reading: t.reading || t.surface_form,
          pos: t.pos,
          meaning: ''
        }));
      } catch (e) {
        console.warn('Kuromoji tokenize error, using fallback');
      }
    }
    
    return this._customTokenize(text);
  },
  
  // ===== CUSTOM TOKENIZE (FALLBACK) =====
  _customTokenize(text) {
    const tokens = [];
    let remaining = text;
    
    const sortedDict = [...CUSTOM_DICT].sort((a, b) => b.surface.length - a.surface.length);
    
    while (remaining.length > 0) {
      let matched = false;
      
      for (const entry of sortedDict) {
        if (remaining.startsWith(entry.surface)) {
          tokens.push({
            surface: entry.surface,
            reading: entry.reading,
            meaning: entry.meaning,
            pos: 'custom'
          });
          remaining = remaining.slice(entry.surface.length);
          matched = true;
          break;
        }
      }
      
      if (!matched) {
        const char = remaining[0];
        const isKanji = this._isKanji(char);
        
        if (isKanji) {
          tokens.push({
            surface: char,
            reading: char,
            meaning: '',
            pos: 'unknown'
          });
        } else {
          const last = tokens[tokens.length - 1];
          if (last && !this._isKanji(last.surface[0]) && !last.surface.match(/^[ァ-ヴー]+$/)) {
            last.surface += char;
            last.reading += char;
          } else {
            tokens.push({
              surface: char,
              reading: char,
              meaning: '',
              pos: 'kana'
            });
          }
        }
        remaining = remaining.slice(1);
      }
    }
    
    return tokens;
  },
  
  // ===== CHECK IF TOKEN NEEDS FURIGANA =====
  _needsFurigana(token) {
    const hiraganaReading = katakanaToHiragana(token.reading);
    return token.surface !== hiraganaReading && this._hasKanji(token.surface);
  },
  
  // ===== CHECK IF TEXT HAS KANJI =====
  _hasKanji(text) {
    return /[\u4E00-\u9FFF]/.test(text);
  },
  
  // ===== CHECK IF CHAR IS KANJI =====
  _isKanji(char) {
    const code = char.charCodeAt(0);
    return code >= 0x4E00 && code <= 0x9FFF;
  },
  
  // ===== WORD TAP HANDLER =====
  _onWordTap(event, word, reading, meaning) {
    event.stopPropagation();
    
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:100;display:flex;align-items:center;justify-content:center;padding:1rem;backdrop-filter:blur(4px);';
    
    const popup = document.createElement('div');
    popup.style.cssText = 'background:white;border-radius:1.5rem;padding:2rem;max-width:350px;width:100%;box-shadow:0 20px 40px rgba(0,0,0,0.15);text-align:center;animation:fadeInUp 0.3s ease;';
    popup.innerHTML = `
      <div style="font-size:1.5rem;font-weight:bold;color:#1e293b;margin-bottom:0.5rem;">${word}</div>
      <div style="font-size:1.125rem;color:#4f46e5;margin-bottom:0.5rem;">${reading}</div>
      ${meaning ? `<div style="font-size:0.875rem;color:#64748b;margin-bottom:1rem;">${meaning}</div>` : ''}
      <button style="background:linear-gradient(135deg,#4f46e5,#6366f1);color:white;padding:0.5rem 1rem;border-radius:0.75rem;font-weight:600;border:none;cursor:pointer;margin:0.25rem;" onclick="FuriganaEngine._addToGlossary('${word.replace(/'/g, "\\'")}', '${reading.replace(/'/g, "\\'")}', '${(meaning || '').replace(/'/g, "\\'")}')">
        <i class="fas fa-plus"></i> Simpan ke Glosarium
      </button>
      <button style="background:#f1f5f9;color:#475569;padding:0.5rem 1rem;border-radius:0.75rem;font-weight:600;border:none;cursor:pointer;margin:0.25rem;" onclick="this.closest('.modal-overlay').remove();">
        Tutup
      </button>
    `;
    
    overlay.appendChild(popup);
    overlay.onclick = function(e) {
      if (e.target === overlay) overlay.remove();
    };
    
    document.body.appendChild(overlay);
  },
  
  // ===== ADD TO GLOSSARY =====
  async _addToGlossary(word, reading, meaning) {
    try {
      if (typeof Storage !== 'undefined') {
        await Storage.addGlossaryWord(word, reading, meaning);
      }
      
      document.querySelector('.modal-overlay')?.remove();
      
      const toast = document.createElement('div');
      toast.style.cssText = 'position:fixed;bottom:1rem;right:1rem;background:#16a34a;color:white;padding:0.75rem 1.25rem;border-radius:0.75rem;font-size:0.875rem;font-weight:500;z-index:200;box-shadow:0 10px 20px rgba(0,0,0,0.15);animation:fadeInUp 0.3s ease;';
      toast.innerHTML = `<i class="fas fa-check"></i> "${word}" disimpan ke Glosarium!`;
      document.body.appendChild(toast);
      
      setTimeout(() => toast.remove(), 2500);
    } catch (err) {
      console.error('Failed to add to glossary:', err);
    }
  },
  
  // ===== LOAD SAVED MODE =====
  async loadMode() {
    if (typeof Storage !== 'undefined') {
      const saved = await Storage.getSetting('furiganaMode', 'ruby');
      this.mode = saved;
      return saved;
    }
    return this.mode;
  }
};

// ========== EXPORT ==========
console.log('📦 Furigana Engine module loaded (Hiragana mode)');
