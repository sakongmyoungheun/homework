# 📖 토큰화 알고리즘 BPE, WordPiece Tokenizer 📖

<br>

## 소개

토큰화는 자연어 처리(Natural Language Processing, NLP)에서 텍스트를 작은 단위로 나누는 과정으로, 자연어 처리 인공지능 학습에 용이하게 데이터를 수정/보완하는 중요한 단계입니다. 이 README는 토큰화 알고리즘 중 BPE, WordPiece Tokenizer에 대한 소개를 제공합니다.

<br>

## 토큰화의 필요성
자연어는 의미를 가진 단어, 문장 등의 의미 있는 단위로 구성되어 있습니다.
하지만 컴퓨터는 텍스트를 처리하기 어려워서, 토큰화는 텍스트를 이해 가능한 작은 부분으로 나누는 방법으로 이 문제를 해결합니다.
여러 이유로 인해 토큰화는 자연어 처리 작업의 성능을 향상시키는 데 중요한 역할을 합니다.

<br>

## 주요 이유

- **단어 단위의 처리:**

  텍스트를 단어로 나누면 의미 있는 정보를 더 쉽게 추출할 수 있습니다.

- **텍스트 정규화:**

  토큰화를 통해 텍스트를 표준화하고 정규화할 수 있습니다.

- **텍스트 통계 수집:** 

  토큰화를 통해 어휘 크기, 단어 빈도 등의 텍스트 통계를 수집할 수 있습니다.

<br>

# BPE(Byte Pair Encoding)

## 소개

- BPE(Byte pair encoding) 알고리즘은 1994년에 제안된 데이터 압축 알고리즘입니다. 하지만 후에 자연어 처리의 **서브 워드 분리 알고리즘**으로 응용되었습니다

- 자연어 처리에서의 BPE는 서브 워드 분리(subword segmentation), 즉 기존에 있던 단어를 분리하는 알고리즘입니다.

- Bottom-up 방식으로 작동하며, **글자(charcter) 단위에서 시작하여 단어 집합(vocabulary)을 만들어냅니다.**

- 이 방법은 Sennrich et al가 2016년도에 서술한 'Neural Machine Translation of Rare Words with Subword Units'논문에서 제안되었습니다
  
- 논문: https://arxiv.org/pdf/1508.07909.pdf

<br>

## BPE의 필요성
- ### **어휘 크기 감소:** ###

  BPE는 어휘 크기를 동적으로 조절할 수 있습니다. 기존의 고정된 어휘 크기보다 더 작은 어휘 크기로 효과적으로 모델을 구성할 수 있습니다. 이는 효율적인 메모리 사용과 학습 속도를 제공하며, 작은 데이터 셋에서 특히 유용합니다.


- ### **희귀한 단어 및 OOV 대처:** ###

  BPE는 희귀한 단어에 대한 대응력을 향상시킵니다. 새로운 단어나 희귀한 단어가 나타나면, BPE는 해당 단어를 부분 단어로 나누어 처리할 수 있습니다. 이는 미등록 단어(out-of-vocabulary)에 대한 강력한 대응을 제공합니다.

- ### **언어 구조 이해:** ###

  BPE는 자연어의 구조를 더 잘 이해하게 도와줍니다. 단어의 부분 구조(subword)를 학습하므로, 모델은 단어 내의 의미적인 구성 요소를 학습할 수 있습니다.

- ### **번역 품질 향상:** ###

  BPE를 사용하면 기계 번역 등의 작업에서 번역 품질이 향상될 수 있습니다. 희귀한 단어나 미등록 단어를 더 효과적으로 처리하며, 언어의 더 깊은 구조를 학습할 수 있습니다.

- ### **유연성:** ###

  BPE는 언어에 종속되지 않으며, 다양한 언어에 적용할 수 있는 일반적인 접근 방식입니다. 이는 다국어 모델이나 언어 간 효율적인 지식 전이(transfer)에 유리합니다.

<br>

## BPE 실행 순서
### 1. 훈련 데이터로부터 단어 빈도수 카운트: 
- 주어진 훈련 데이터에서 각 단어들의 빈도수를 계산합니다.
- 예시: 'apple'

### 2. 모든 단어들을 글자(chracter) 단위로 분리:
- 훈련 데이터에 있는 모든 단어들을 글자 단위로 분리합니다.
- 예시: 'apple' -> 'a', 'p', 'p', 'l', 'e'
  
### 3. 빈도가 가장 높은 글자(chracter) 쌍을 하나의 글자(chracter)로 통합: 
- 빈도가 가장 높은 글자(chracter) 쌍을 찾아서 하나의 새로운 글자(chracter)로 통합합니다. 이미 통합된 글자(chracter)들도 고려하여 빈도수를 업데이트합니다.
- 예시: ('a', 'p', 'p', 'l', 'e') -> 'ap', 'pp', 'pl', 'le' 중 'ap'가 가장 많은 빈도를 가짐을 가정합니다.
- 업데이트 후 'a', 'p', 'p', 'l', 'e' -> 'ap', 'p', 'l', 'e'

### 4. 반복:
- 단계 3의 과정을 원하는 횟수나 기준을 충족할 때까지 반복합니다.
- 예시: 새로운 상태에서 'ap', 'p', 'l', 'e' 중에서 빈도가 가장 높은 쌍을 찾아서 통합하고 이를 반복합니다.

<p align="center">
  <img src="https://github.com/zzzxxcc123/BPE-WordPiece-Tokenizer/assets/117971016/78404a3d-cfca-4ef1-8310-fbef64e8ff93" alt="이미지 설명">
</p>

## BPE 알고리즘 적용

### 글자 단위 분리:
- 입력된 단어를 글자 단위로 분리합니다.
- 'lowest' -> 'l', 'o', 'w', 'e', 's', 't'
  
### 서브워드 탐색 및 분해:
- 분리된 글자들을 이용하여 기존 어휘를 참조하여 가장 비슷한 패턴의 서브워드를 찾아냅니다.
- 'l', 'o', 'w', 'e', 's', 't'에서 'lo'와 'we'가 이미 어휘에 존재하는 패턴이라면 이를 서브워드로 분해합니다.
  
### 서브워드로 인코딩:
- 찾아낸 서브워드로 입력된 단어를 인코딩합니다. 'lowest' -> 'low'와 'est'

### 최종 결과:
- 인코딩된 서브워드들로 최종적인 텍스트를 구성합니다. 'lowest' -> 'low'와 'est'

<p align="center">
  <img src="https://github.com/zzzxxcc123/BPE-WordPiece-Tokenizer/assets/117971016/4d0d7eb7-c656-4295-89ea-7f8f1683eade" alt="이미지 설명">
</p>



