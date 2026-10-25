---
title: Online voting: how to vote over the internet securely
---
Online voting allows voters to cast their ballot from any location and device with an internet connection, without having to go to a physical polling place. This modality is increasingly in demand for its ability to broaden participation and simplify electoral logistics, but its adoption depends on a non-negotiable condition: that the process guarantees the security, secrecy and integrity of every vote cast.

This article explains what online voting is, what security principles it must meet, how a well-designed internet voting process works and what considerations bodies and organizations evaluating its implementation should keep in mind.

## What is online voting

Online voting is a form of remote electronic voting in which the voter accesses a secure platform from their computer, tablet or mobile phone, authenticates, selects their choice and casts their vote in encrypted form.

The process takes place within a voting period defined by the electoral authority, which can extend over several days to facilitate participation.

Unlike in-person electronic voting, where the citizen uses a terminal at a polling place, online voting eliminates the geographic barrier. The voter votes from wherever they are, at the time most convenient for them within the enabled period.

This flexibility makes it an especially relevant tool for diaspora elections, where citizens residing abroad face logistical barriers to voting in person or by mail.

Also for internal processes of political parties, unions, professional associations and organizations, where setting up complete in-person infrastructure is disproportionate. And for public consultations or referendums seeking to maximize the reach of citizen participation.

## Security principles of online voting

Security in online voting is built on a set of technical and operational principles that must be met simultaneously. The absence of any one of them compromises the validity of the process.

### Robust authentication

Only eligible voters should be able to access the system and cast a vote. This requires identity verification mechanisms that go beyond a simple username and password. The most widely used methods include digital certificates, two-factor authentication and biometric verification systems, depending on the level of security the process demands.

### End-to-end encryption

The content of the vote must remain secret from the moment the voter casts it until the count takes place.

End-to-end encryption guarantees that the vote is encrypted on the voter's device and remains encrypted throughout transmission and storage. It is only decrypted at the moment of counting, following auditable cryptographic protocols.

No intermediary, including the platform provider, can learn the content of an individual vote.

### Integrity

Once cast, the vote cannot be altered, modified or deleted. The digital signature of each ballot by the voter is the mechanism that ensures the vote is counted exactly as expressed. Any subsequent modification attempt invalidates the signature and is recorded.

### Uniqueness

Each voter can only vote once. The system must have mechanisms to detect and prevent duplicate votes without compromising ballot anonymity.

The separation between the participation record (who voted) and the content of the vote (what they voted) is structural in well-designed systems.

### Non-traceability

It must be impossible to link the cast vote to the voter's identity. In a digital environment, where every action generates records, guaranteeing non-traceability requires a specific architectural design that irreversibly separates the voter's identity from their ballot. This principle protects ballot secrecy and prevents any form of coercion or pressure on the voter.

### Individual and universal verifiability

Online voting must offer two levels of verification. At the individual level, the voter can confirm that their vote was correctly received by the system and will be included in the count.

At the universal level, any independent auditor can check that all votes cast were counted in the final result, without being able to access the content of each individual vote.

This double verifiability is what allows an online voting process to reach levels of trust comparable to in-person voting.

### Auditability

The system must generate cryptographically protected records of all relevant actions and events in the process. These immutable logs enable complete technical audits before, during and after the election, and constitute the evidence on which independent auditors can assess the integrity of the process.

## How a secure online voting process works

A well-designed online voting process follows a sequence that combines user experience with security controls at every step.

### Enablement and communication

Before the voting period opens, the electoral authority defines the roll of eligible voters, configures the electoral offer on the platform and communicates to voters how to access the system, what credentials they need and what security measures they should observe.

Voter communication is an integral part of the process: it includes clear instructions on how to vote and warnings about risks such as phishing or credential disclosure.

### Voter authentication

The voter accesses the platform and authenticates through the mechanisms defined for the process. The system verifies that the voter appears on the enabled roll and has not previously cast a vote.

### Casting the vote

Once authenticated, the voter accesses the voting screen, where they view the available options and select their preference. Before confirming, they can review their selection.

Upon confirmation, the vote is encrypted on their own device before being sent to the server. From that moment, the content of the vote is inaccessible to any actor in the system.

### Confirmation and verification

After casting their vote, the voter receives confirmation that their ballot was correctly received. Depending on the system, they may also receive a cryptographic receipt that allows them to later verify that their vote was included in the count, without revealing its content.

### Counting

At the close of the voting period, encrypted votes are decrypted following cryptographic protocols involving multiple key custodians, generally in a public ceremony before observers and overseers. The results are consolidated and published according to the procedures defined by the electoral authority.

## Considerations for bodies evaluating online voting

Implementing online voting requires an analysis that goes beyond selecting a technology platform.

### Legal framework

The electoral regulations of each jurisdiction define whether remote voting is allowed, under what conditions and with what oversight requirements.

In some jurisdictions it may be necessary to promote legal reforms before implementing this modality.

### Process governance

The process needs clearly defined roles: who administers the system, who supervises, who audits and who has access to each component.

The key ceremonies of the process, such as the generation of cryptographic keys and the closing of voting, must be carried out before overseers and observers to maintain transparency.

### Pilots and gradual scaling

The experience of multiple jurisdictions shows that the most successful adoption processes begin with controlled pilots in smaller-scale elections. This allows process actors to become familiar with the technology, adjust operating procedures and identify improvements before scaling to larger elections.

### Independent audit

Hiring external experts to audit both the platform and the operating procedures before the election is a practice that strengthens the trust of all actors involved.

## Invote: COMITIA's online voting platform

Invote is COMITIA's online voting solution, designed to meet each of the security principles described in this article.

Its architecture incorporates end-to-end encryption, digital signature of each vote, robust voter authentication, individual and universal verifiability, structural non-traceability between identity and ballot, and generation of immutable logs for independent audits.

Invote was used in 2025 in the Argentine province of Tierra del Fuego for the jurisdiction's first internet election, where it was combined with the Electronic Single Ballot (BUE) for in-person voting in the same electoral process. This experience demonstrated that online voting can coexist with in-person modalities within a consistent framework of security and oversight.

Invote was also recognized at the Zero Project Conference, an Essl Foundation initiative promoting the rights of people with disabilities, held at the United Nations in Vienna, for its contribution to electoral accessibility. The platform allows people with visual or physical disabilities, or with literacy-related needs, to vote without assistance, preserving ballot secrecy and privacy at all times. In addition to Argentina, Invote has been deployed in real electoral processes in Spain, Canada and the United Arab Emirates.

The platform operates within the framework of COMITIA's ISO/IEC 27001 and ISO/IEC 27701 certifications, issued by TÜV Rheinland, which attests that its security and privacy management processes meet international standards verified periodically and independently.

Online voting, implemented with the right controls, expands the possibilities of democratic participation without compromising the guarantees that every electoral process demands. The key is for the technology to operate within a framework of security, governance and transparency that sustains the legitimacy of the result.
