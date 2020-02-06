

/* 
https://mp.weixin.qq.com/s/jz1ajDUygZ7sXLQFHyfjWA

红黑树(Red Black Tree)是一种自平衡的二叉查找树，除了符合二叉查找树的基本特性外，它还具有下列附加特性：
红黑树的特性：
1.节点是红色或黑色。

2.根节点是黑色。

3.每个叶子节点都是黑色的空节点（NIL节点）。

4 每个红色节点的两个子节点都是黑色。(从每个叶子到根的所有路径上不能有两个连续的红色节点)

5.从任一节点到其每个叶子的所有路径都包含相同数目的黑色节点。

6、红黑树从根到叶子的最长路径不会超过最短路径2倍。

当插入一个节点时需要调整红黑树(插入节点不一定会破坏红黑树的特性)，方法有两种：
1、变色
2、旋转：左旋转、右旋转

左旋转：
逆时针旋转红黑树的两个节点，使得父节点被自己的右孩子取代，而自己成为自己的左孩子。下图：
                  x
                /   \
               a     y
                    / \
                   b   c
左旋转后如下：
                  y
                /   \
               x     c
              / \
             a   b
以上，身为右孩子的Y取代了X的位置，而X变成了自己的左孩子。此为左旋转。

右旋转：
顺时针旋转红黑树的两个节点，使得父节点被自己的左孩子取代，而自己成为自己的右孩子。下图：
                  x
                /   \
               y     a
              / \
             b   c
右旋转后如下：
                  y
                /   \
               b     x
                    / \
                   c   a
以上，身为左孩子的Y取代了X的位置，而X变成了自己的右孩子。此为右旋转。



红黑树的优势：
什么情况下需要变色；
什么情况下需要旋转：
红黑树的应用有很多，其中JDK的集合类TreeMap和TreeSet底层就是红黑树实现的。在Java8中，HashMap也用到了红黑树。
*/




