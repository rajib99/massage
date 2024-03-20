import React, { useState, useEffect } from 'react';
import utilStyles from  '../styles/utils.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';




//
function SingleGalleryItem({ imgblob }) {
  return (
    <img src={imgblob} />
  );
}

export default SingleGalleryItem;