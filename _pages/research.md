---
layout: archive
title: "Research"
permalink: /research/
author_profile: true
header:
  og_image: "research/ecdf.png"
---
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
## Post Phd Research
<nbsp>  

{% include base_path %}

{% assign ordered_pages = site.research | sort:"order_number" %}

{% for post in ordered_pages %}
  {% include archive-single.html type="grid" %}
{% endfor %}

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
## Academic Research
### [2011-2017] Research Scholar, IIT Kharagpur
This thesis explored the idea that vibration signals are used for health monitoring of civil structure such as buildings, bridges, etc. using vibration signal analysis. It explores the different features sensitive to the level of the damage, and outlier detection approaches based on optimal residual space model (ORS). The proposed methods detect the severity of damage and location under varying operational and environmental conditions.

### [2009-2011] M.Tech Student, NIT Rourkela

Master's thesis work is to develop an algorithm for human ear identification. SIFT features are extracted from the segmented ear lobes and conchas, which are invariant to image scaling, rotation, illumination, and some affine change in object. It enables the correct match for a keypoints to be selected from a large database of other keypoints for identification.
 
### [2005-2009] BTech Student, DRIEMS Cuttack 

Software Defined Radio using LMS algorithm


  

