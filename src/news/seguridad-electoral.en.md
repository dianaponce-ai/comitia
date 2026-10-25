---
title: Electoral security: how to guarantee trust in digital voting
---
Electoral security determines whether a voting process can be considered legitimate. Without it, the results of an election lack credibility, regardless of the technology used or the number of votes cast.

As more countries and organizations incorporate digital solutions into their elections, electoral security ceases to be an exclusively technical matter and becomes a condition of governability.

This article explains what electoral security is, why voting infrastructure requires specific protection, and how to build a digital voting system that can sustain public trust.

## What is electoral security

Electoral security is the set of technical, operational and institutional measures that protect the integrity of a voting process.

Its scope covers everything from the preparation of the electoral roll to the publication of results, and includes both the physical and digital systems involved at each stage.

A secure electoral process guarantees that only eligible voters can cast a ballot, that each vote is recorded and counted exactly as expressed, that ballot secrecy is preserved at all times, and that results can be verified and audited by independent actors.

When any of these conditions fails, the legitimacy of the entire election is compromised. That is why electoral security is not an optional component added at the end of the process: it is the foundation on which democratic trust is built.

## Why electoral infrastructure requires specific protection

Electoral infrastructure has characteristics that make it particularly sensitive.

Unlike other technological systems where a failure can be corrected and service resumed, in an election errors can be irreversible and their consequences directly affect the governability of a country or an institution.

### Narrow operating windows

An election takes place within a defined period of time. If the system fails during election day, it is not always possible to extend deadlines or repeat the process.

This demands levels of availability and contingency plans that go beyond what a conventional application requires.

### Broad attack surface

Electoral infrastructure involves multiple components operating simultaneously: voting terminals, transmission networks, computing centers, check-in devices, remote voting platforms.

Each of these elements represents a point that must be protected independently and in a coordinated manner.

### Impact on public trust

A vulnerability in a banking system generates financial losses. A vulnerability in an electoral system generates a crisis of legitimacy.

Public perception is as important as technical reality: even if an incident does not alter the results, the mere fact that it occurs can erode trust in the entire process.

### Diversity of actors and contexts

Electoral processes involve polling station authorities, party overseers, observers, voters with varying levels of technological familiarity and legal frameworks that vary across jurisdictions.

Security must work in all these contexts without depending on each actor having specialized technical knowledge.

These characteristics mean that electoral security requires a comprehensive approach combining technology, operational processes and independent validation.

## The properties of a trustworthy digital voting system

Beyond the specific technology used, every digital voting system must be able to demonstrate that it meets a set of fundamental properties. Demonstrate, not just claim.

### Vote integrity

The vote cast by the voter must be exactly the same one that is recorded and counted. In the case of the Electronic Single Ballot (BUE), this is achieved with a dual backup: the vote is printed on paper and recorded on an RFID chip inside the same ballot.

The voting terminal stores no data. If there is a discrepancy between paper and chip, the paper prevails as the source of truth.

### Secrecy and non-traceability

It must be impossible to link a vote to the identity of the person who cast it. This property must hold at every stage of the process, from casting to counting.

In remote voting platforms such as Invote, end-to-end encryption and the structural separation between identity and vote guarantee this principle even in environments where the voter casts their ballot from their own device.

### Verifiability

A trustworthy system allows two levels of verification. At the individual level, the voter can confirm that their vote was correctly received. At the universal level, any auditor can check that all votes cast were included in the final result, without knowing the content of each one.

### Auditability

Independent third parties such as political parties, technical experts and oversight bodies must be able to review and reproduce the controls applied before, during and after the election.

A system that does not allow external audits can hardly sustain public trust in the long term.

### Availability and resilience

The system must work under real operating conditions, anticipate contingencies and recover from incidents without affecting votes already cast. This includes scenarios of limited connectivity, demand spikes and hardware failures.

## The four dimensions of electoral security

Public debate about digital voting tends to focus on a single question: can it be hacked?

Cybersecurity is fundamental, but approaching electoral security exclusively from that angle leaves out dimensions that are just as critical.

### Security by design

The system architecture is built from the outset with a minimal attack surface.

In COMITIA's solutions, this translates into principles such as secure boot, minimal persistence of sensitive data on devices and the use of standard cryptography to protect every operation.

### Operational security

Procedures, defined roles, records of every action and contingency plans are as important as the code. Robust software deployed with weak processes is still a vulnerable system.

### Verifiable security

Controls cannot depend on trust in the provider. There must be public mechanisms that allow overseers, observers and auditors to confirm that the system operates as expected.

This is the logic COMITIA applies in Turing, where tally sheets are digitized at the polling place and validated by the polling station authority in the presence of party overseers before transmission.

### Institutional security

A provider's electoral security must reflect how it operates as an organization. That means documented risk management, continuous improvement policies and standards that are sustained over time, not just during a specific election.

## The chain of trust in practice

These dimensions materialize in three layers that must work in an integrated manner.

The first is auditable technical design. In BUE, the terminal does not retain the vote: everything stays on the physical ballot.

In Invote, the vote is encrypted on the voter's device and only decrypted for the final count. In Turing, tally sheets are transmitted with encrypted protocols such as TLS and with operator authentication. In all cases, the design allows third parties to verify each step without compromising ballot secrecy.

The second is the controlled electoral process. Every election requires clear roles among authorities, technicians and oversight. It requires prior controls including tests, drills and audits. It requires active monitoring during election day and contingency capacity. And it requires subsequent controls: recounts, cross-audits and record reviews.

The third is independent validation. Public trust is strengthened when third parties evaluate the system: external auditors, universities, technical bodies and certification entities.

These evaluations cover security, privacy, process quality and compliance with internationally recognized standards.

## Why certifications are the differentiator in electoral security

In the electoral technology sector, many organizations claim to be secure and auditable. What makes a real difference is what can be demonstrated and under which standard.

International certifications require maintaining repeatable, documented processes, risk management with controls and evidence, periodic external audits with findings and corrective actions, and a standardized language that facilitates communication with electoral authorities.

### ISO/IEC 27001: Information Security

This certification attests that the organization manages security systematically: policies, risk management, access controls, incident handling and operational continuity. In the electoral context, where the service involves data, software, infrastructure and field operations, having a comprehensive management framework is a structural requirement.

### ISO/IEC 27701: Privacy

This certification extends the management system to privacy: how personal data is handled, what roles exist in its processing, how data minimization is applied and how the third parties involved are controlled.

It is especially relevant in components that process personal data, such as the management of electoral rolls through solutions like Notebox.

COMITIA holds both certifications, issued by TÜV Rheinland, covering activities ranging from software design and development to the implementation, maintenance and support of electoral solutions.

## Modernizing without compromising legitimacy

The future of elections runs through technology. But democratic legitimacy demands that this modernization be accompanied by verifiable controls and recognized standards.

COMITIA's digital platforms (BUE, Invote, Turing, Notebox) are designed to operate in real electoral contexts, with all the complexity that entails.

What backs them goes beyond their technical architecture: it is a management framework sustained by international certifications, periodic external audits and a way of operating oriented toward continuous improvement.

In electoral security, the difference between a claim and a guarantee is the ability to prove it.
