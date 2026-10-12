import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, {
  Path,
  Circle,
  Ellipse,
  Rect,
  G,
  Defs,
  RadialGradient,
  LinearGradient,
  Stop,
  Polygon,
  Text as SvgText,
} from 'react-native-svg';

export const Splash01Illustration: React.FC = () => {
  return (
    <View style={styles.svgWrapper}>
      <Svg width={260} height={240} viewBox="0 0 300 280" fill="none">
        {/* Husband robe */}
        <Path
          d="M72 170 C72 135, 102 110, 138 108 L170 145 C150 185, 115 220, 60 226 L72 170 Z"
          fill="#F0E6F1"
        />
        {/* Taqiyah cap */}
        <Ellipse cx="132" cy="74" rx="19" ry="12" fill="#6A3794" />
        {/* Head/Face skin */}
        <Path
          d="M120 78 C120 70, 144 70, 144 78 C144 88, 142 97, 132 99 C122 97, 120 88, 120 78 Z"
          fill="#FCECE1"
        />
        {/* Beard & hair */}
        <Path
          d="M117 76 C117 96, 122 108, 132 108 C142 108, 147 96, 147 76 C147 88, 141 103, 132 103 C123 103, 117 88, 117 76 Z"
          fill="#241B33"
        />
        <Path
          d="M118 80 C116 88, 119 104, 132 104 C145 104, 148 88, 146 80 C144 94, 140 101, 132 101 C124 101, 120 94, 118 80 Z"
          fill="#241B33"
        />
        {/* Wife Headscarf/Hijab (Primary Purple) */}
        <Path
          d="M178 95 C178 78, 194 73, 210 84 C224 94, 238 120, 240 148 C240 170, 228 190, 212 196 C190 204, 172 188, 172 150 C172 125, 178 105, 178 95 Z"
          fill="#6A3794"
        />
        {/* Wife Face */}
        <Path
          d="M182 92 C186 86, 198 86, 202 93 C205 99, 204 109, 197 113 C189 116, 182 107, 182 92 Z"
          fill="#FCECE1"
        />
        {/* Wife Abaya Base */}
        <Path
          d="M170 140 C176 130, 222 142, 235 186 C242 210, 243 234, 243 238 L168 238 Z"
          fill="#DBCADD"
        />
        {/* Wife Purple Drape */}
        <Path
          d="M176 138 C185 134, 215 136, 227 165 C237 190, 238 215, 220 224 C205 231, 185 220, 182 200 C178 184, 174 150, 176 138 Z"
          fill="#6A3794"
        />
        {/* Husband arm embrace in purple */}
        <Path
          d="M96 160 C96 135, 140 135, 156 165 C162 176, 160 216, 132 225 C108 232, 96 200, 96 160 Z"
          fill="#5A2F78"
        />
        {/* Child swaddle */}
        <Circle cx="168" cy="188" r="32" fill="#F0E6F1" />
        <Circle cx="168" cy="148" r="14" fill="#FCECE1" />
        <Ellipse cx="155" cy="198" rx="14" ry="17" fill="#5A2F78" />
        <Circle cx="155" cy="172" r="10" fill="#5A2F78" />
        {/* Embrace stroke lines */}
        <Path
          d="M106 142 C104 165, 118 195, 132 208"
          stroke="#341E47"
          strokeWidth="1.8"
          strokeLinecap="round"
          opacity="0.6"
        />
        <Path
          d="M222 150 C215 174, 195 198, 172 204"
          stroke="#341E47"
          strokeWidth="1.8"
          strokeLinecap="round"
          opacity="0.6"
        />
        <Path
          d="M172 202 C178 206, 188 206, 192 198"
          stroke="#FCECE1"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </Svg>
    </View>
  );
};

export const Splash02Illustration: React.FC = () => {
  return (
    <View style={styles.svgWrapper}>
      <Svg width={260} height={240} viewBox="0 0 280 280" fill="none">
        <Defs>
          <RadialGradient id="shieldGlow" cx="50%" cy="50%" r="50%">
            <Stop offset="0%" stopColor="#F0E6F1" stopOpacity="0.8" />
            <Stop offset="100%" stopColor="#FDFCFC" stopOpacity="0" />
          </RadialGradient>
          <LinearGradient id="curtainGrad" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor="#DBCADD" />
            <Stop offset="100%" stopColor="#F0E6F1" />
          </LinearGradient>
        </Defs>

        {/* Halo background */}
        <Circle cx="140" cy="140" r="110" fill="url(#shieldGlow)" />

        {/* Card backdrop */}
        <Rect
          x="44"
          y="28"
          width="192"
          height="224"
          rx="28"
          fill="#FFFFFF"
          stroke="#DBCADD"
          strokeWidth="1.5"
        />

        {/* Inner blurred photo container */}
        <Rect
          x="56"
          y="40"
          width="168"
          height="200"
          rx="20"
          fill="url(#curtainGrad)"
        />

        {/* Abstract portrait silhouette under veil */}
        <Circle cx="140" cy="100" r="32" fill="#AD91C1" opacity="0.6" />
        <Path
          d="M80 188 C80 148, 110 134, 140 134 C170 134, 200 148, 200 188 Z"
          fill="#AD91C1"
          opacity="0.7"
        />

        {/* Translucent glass overlay */}
        <Rect
          x="56"
          y="40"
          width="168"
          height="200"
          rx="20"
          fill="#FFFFFF"
          opacity="0.45"
        />

        {/* Center Purple Shield Lock Badge */}
        <Circle cx="140" cy="140" r="32" fill="#6A3794" />
        <Circle cx="140" cy="140" r="32" stroke="#FFFFFF" strokeWidth="2.5" />
        <Path
          d="M133 135 V130 C133 126, 136 123, 140 123 C144 123, 147 126, 147 130 V135"
          stroke="#FFFFFF"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <Rect
          x="130"
          y="135"
          width="20"
          height="16"
          rx="4"
          fill="#FFFFFF"
        />
        <Circle cx="140" cy="142" r="2" fill="#6A3794" />

        {/* Top-right Verified Seal in Heritage Gold */}
        <Circle cx="196" cy="64" r="14" fill="#FCF8ED" stroke="#D4AF37" strokeWidth="1" />
        <Path
          d="M192 64 L195 67 L200 61"
          stroke="#8A711E"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
};

export const Splash03Illustration: React.FC = () => {
  return (
    <View style={styles.svgWrapper}>
      <Svg width={260} height={240} viewBox="0 0 280 280" fill="none">
        <Defs>
          <RadialGradient id="halo3" cx="50%" cy="50%" r="50%">
            <Stop offset="0%" stopColor="#F0E6F1" stopOpacity="0.9" />
            <Stop offset="100%" stopColor="#FDFCFC" stopOpacity="0" />
          </RadialGradient>
          <LinearGradient id="soundBarGrad" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor="#6A3794" />
            <Stop offset="100%" stopColor="#5A2F78" />
          </LinearGradient>
        </Defs>

        {/* Halo circle */}
        <Circle cx="140" cy="140" r="120" fill="url(#halo3)" />
        <Circle cx="140" cy="140" r="105" stroke="#DBCADD" strokeWidth="1" strokeDasharray="4 6" />

        {/* Left card (Groom) */}
        <G transform="rotate(-6 95 125)">
          <Rect x="36" y="52" width="118" height="146" rx="20" fill="#FDFCFC" stroke="#DBCADD" strokeWidth="1" />
          <Circle cx="95" cy="100" r="26" fill="#F0E6F1" />
          <Path
            d="M73 99C73 86.8 82.8 77 95 77C107.1 77 117 86.8 117 99C117 101.5 116.5 104 115.5 106.5C110 102 102 99.5 95 99.5C87 99.5 78.5 102.5 73.5 107C73.1 104.5 73 101.8 73 99Z"
            fill="#59445F"
          />
          <Path
            d="M54 162C54 140.5 71.5 123 93 123H97C118.5 123 136 140.5 136 162V170H54V162Z"
            fill="#DBCADD"
          />
          <Rect x="52" y="179" width="86" height="8" rx="4" fill="#E8DCEB" />
        </G>

        {/* Right card (Bride) */}
        <G transform="rotate(5 180 135)">
          <Rect x="122" y="58" width="122" height="152" rx="20" fill="#FFFFFF" stroke="#DBCADD" strokeWidth="1" />
          <Circle cx="183" cy="106" r="27" fill="#F0E6F1" />
          <Path
            d="M161 106C161 93.8 170.8 84 183 84C195.1 84 205 93.8 205 106C205 115.5 199.5 123 191 127L194 172H174L175 127C166.5 123 161 115.5 161 106Z"
            fill="#6A3794"
          />
          <Ellipse cx="183" cy="107" rx="13" ry="16" fill="#F8EADB" />
          <Path
            d="M140 166C140 148.5 155 133 173.5 133H192.5C211 133 226 148.5 226 166V176H140V166Z"
            fill="#AD91C1"
          />
          <Rect x="140" y="186" width="86" height="8" rx="4" fill="#F0E6F1" />
        </G>

        {/* Floating Voice Intro Audio Pill */}
        <Rect x="42" y="174" width="196" height="46" rx="23" fill="#FFFFFF" stroke="#DBCADD" strokeWidth="1" />
        <Circle cx="65" cy="197" r="14" fill="#6A3794" />
        <Polygon points="62,191 71,197 62,203" fill="#FFFFFF" />
        {/* Waveform bars in Rich Purple */}
        <Rect x="88" y="193" width="3" height="8" rx="1.5" fill="url(#soundBarGrad)" />
        <Rect x="94" y="189" width="3" height="16" rx="1.5" fill="url(#soundBarGrad)" />
        <Rect x="100" y="184" width="3" height="26" rx="1.5" fill="url(#soundBarGrad)" />
        <Rect x="106" y="190" width="3" height="14" rx="1.5" fill="url(#soundBarGrad)" />
        <Rect x="112" y="186" width="3" height="22" rx="1.5" fill="url(#soundBarGrad)" />
        <Rect x="118" y="181" width="3" height="32" rx="1.5" fill="url(#soundBarGrad)" />
        <Rect x="124" y="187" width="3" height="20" rx="1.5" fill="url(#soundBarGrad)" />
        <Rect x="130" y="183" width="3" height="28" rx="1.5" fill="url(#soundBarGrad)" />
        <Rect x="136" y="189" width="3" height="16" rx="1.5" fill="url(#soundBarGrad)" />
        <Rect x="142" y="185" width="3" height="24" rx="1.5" fill="url(#soundBarGrad)" />
        <Rect x="148" y="192" width="3" height="10" rx="1.5" fill="url(#soundBarGrad)" />
        <Rect x="154" y="188" width="3" height="18" rx="1.5" fill="url(#soundBarGrad)" />
        <Rect x="160" y="183" width="3" height="28" rx="1.5" fill="url(#soundBarGrad)" />
        <Rect x="166" y="191" width="3" height="12" rx="1.5" fill="url(#soundBarGrad)" />
        <Rect x="172" y="194" width="3" height="6" rx="1.5" fill="url(#soundBarGrad)" />
        {/* Time duration chip */}
        <Rect x="183" y="188" width="44" height="18" rx="9" fill="#F0E6F1" />
        <SvgText x="205" y="201" fill="#6A3794" fontSize="10" fontWeight="700" textAnchor="middle">
          0:45
        </SvgText>

        {/* Wali Chaperone Badge (Top right) */}
        <Rect x="188" y="60" width="56" height="28" rx="14" fill="#FCF8ED" stroke="#D4AF37" strokeWidth="1" />
        <Path d="M198 69.5C198 69.5 202 68.5 204 67C206 68.5 210 69.5 210 69.5C210 74 207 78.5 204 80C201 78.5 198 74 198 69.5Z" fill="#6A3794" />
        <Path d="M201.8 73.6L203.3 75.1L206.5 71.8" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        <SvgText x="223" y="78" fill="#6A3794" fontSize="10" fontWeight="700" textAnchor="middle">
          Wali
        </SvgText>
      </Svg>
    </View>
  );
};

export const LogoEmblemSvg: React.FC<{ size?: number }> = ({ size = 96 }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      {/* Outer Golden Geometric Star / Crest */}
      <Circle cx="50" cy="50" r="46" fill="#5A2F78" stroke="#D4AF37" strokeWidth="2" />
      <Circle cx="50" cy="50" r="40" stroke="#D4AF37" strokeWidth="0.75" strokeDasharray="2 3" opacity="0.8" />
      {/* Crescent Moon */}
      <Path
        d="M50 20 C66 20, 78 33, 78 50 C78 67, 66 80, 50 80 C44 80, 38 78, 33 74 C44 72, 52 62, 52 50 C52 38, 44 28, 33 26 C38 22, 44 20, 50 20 Z"
        fill="#D4AF37"
      />
      {/* 8-pointed star in auspicious gold */}
      <Path
        d="M38 42 L41 38 L45 42 L49 38 L48 44 L54 46 L48 48 L49 54 L45 50 L41 54 L38 50 L32 48 L38 46 Z"
        fill="#FAF6EE"
      />
    </Svg>
  );
};

const styles = StyleSheet.create({
  svgWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
