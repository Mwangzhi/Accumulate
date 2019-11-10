

/* 
https://www.cnblogs.com/bonelee/p/8830825.html
又称单词查找树，前缀树,Trie树，是一种树形结构，是一种哈希树的变种。
典型应用是用于统计，排序和保存大量的字符串（但不仅限于字符串），
所以经常被搜索引擎系统用于文本词频统计。
它的优点是：利用字符串的公共前缀来减少查询时间，
最大限度地减少无谓的字符串比较，查询效率比哈希树高。

常用于词频统计，
字符串的快速查找，最长前缀匹配等问题以及相关变种问题。
典型的用空间换取时间

根节点不包含字符，除根节点外每一个节点都只包含一个字符；
从根节点到某一节点，路径上经过的字符连接起来，为该节点对应的字符串； 
每个节点的所有子节点包含的字符都不相同。
*/






/* 
LC: 720 https://leetcode.com/problems/longest-word-in-dictionary/submissions/
*/
class Trie {
    constructor() {
        this.leaf = false;
        this.children = {};
    }
    insert(str) {
        const stack = [...str].reverse();
        return this._insert(stack);
    }
    _insert(stack) {
        if (stack.length === 0) {
            this.leaf = true;
            return;
        }
        const c = stack.pop();
        if (!(c in this.children)) {
            this.children[c] = new Trie();
        }
        this.children[c]._insert(stack)
    }
    search(str) {
        const stack = [...str].reverse();
        return this._search(stack, p => p.leaf);
    }
    _search(stack, cound) {
        let p = this;
        while (stack.length > 0) {
            const c = stack.pop();
            if (c in p.children) {
                p = p.children[c];
            } else {
                return false;
            }
        }
        return cound(p);
    }
    startsWith() {
        const stack = [...str].reverse();
        return this._search(stack, p => true);
    }
}
