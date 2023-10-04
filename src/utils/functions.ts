export function calculateDate(date: string) {
  const now = new Date();
  const createdAt = new Date(date);

  const timeDifferenceInSeconds = Math.floor(
    (now.getTime() - createdAt.getTime()) / 1000
  );

  if (timeDifferenceInSeconds < 60) {
    return "방금";
  } else if (timeDifferenceInSeconds < 3600) {
    const minutes = Math.floor(timeDifferenceInSeconds / 60);
    return `${minutes}분 전`;
  } else if (timeDifferenceInSeconds < 86400) {
    const hours = Math.floor(timeDifferenceInSeconds / 3600);
    return `${hours}시간 전`;
  } else {
    const days = Math.floor(timeDifferenceInSeconds / 86400);
    return `${days}일 전`;
  }
}
