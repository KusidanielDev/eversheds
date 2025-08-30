/** Small, meaningful fuzzy matching used by the search overlay and /api/search */
export function levenshtein(a:string,b:string){
  const m=a.length, n=b.length; const dp=Array.from({length:m+1},()=>Array(n+1).fill(0));
  for(let i=0;i<=m;i++) dp[i][0]=i;
  for(let j=0;j<=n;j++) dp[0][j]=j;
  for(let i=1;i<=m;i++){
    for(let j=1;j<=n;j++){
      const cost = a[i-1]===b[j-1] ? 0 : 1;
      dp[i][j]=Math.min(dp[i-1][j]+1, dp[i][j-1]+1, dp[i-1][j-1]+cost);
    }
  }
  return dp[m][n];
}
export function score(query:string, text:string){
  const q=query.trim().toLowerCase(); const t=text.toLowerCase();
  if(!q) return 0;
  const dist = levenshtein(q, t.slice(0, q.length));
  const idx = t.indexOf(q);
  let s = 100 - dist*5 - (idx>=0?idx:20);
  if (t.startsWith(q)) s += 10;
  return s;
}
export function rank(query:string, items:{label:string,href:string}[], limit=20){
  return items.map(i=>({ ...i, s: score(query, i.label) }))
              .filter(r=>r.s>30).sort((a,b)=>b.s-a.s).slice(0, limit);
}
